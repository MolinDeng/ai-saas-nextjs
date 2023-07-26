import { checkApiLimit, incrementApiLimit } from '@/lib/api-limit';
import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
  openai,
} from '@/lib/openai';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

const instructionMsg: ChatCompletionResponseMessage = {
  role: 'system',
  content:
    'You are a code generator. You must answer only in markdown code sinppets. Use code comments for explanations',
};

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    const { messages } = await req.json();
    if (!messages) return new NextResponse('Message required', { status: 400 });

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse(
        'Free trial has expired. Please upgrade to pro.',
        { status: 403 }
      );
    }

    const msg = await openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [instructionMsg, ...messages],
      })
      .then((res) => res.data.choices[0].message)
      .catch((err) => {
        return {
          role: 'system',
          content: `Onwhiz was unable to find an answer for that ! (Error: ${err.message})`,
        } as ChatCompletionRequestMessage;
      });

    if (!isPro) await incrementApiLimit();

    return NextResponse.json(msg);
  } catch (error) {
    console.log('[CODE_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
