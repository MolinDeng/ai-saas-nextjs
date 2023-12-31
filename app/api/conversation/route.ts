import { checkApiLimit, incrementApiLimit } from '@/lib/api-limit';
import { ChatCompletionRequestMessage, openai } from '@/lib/openai';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

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

    // request OpenAI completion
    const msg = await openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
      })
      .then((res) => res.data.choices[0].message)
      .catch((err) => {
        return {
          role: 'system',
          content: `Onwhiz was unable to find an answer for that ! (Error: ${err.message})`,
        } as ChatCompletionRequestMessage;
      });

    // save message to DB

    // update free trial usage
    if (!isPro) await incrementApiLimit();

    return NextResponse.json(msg);
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
