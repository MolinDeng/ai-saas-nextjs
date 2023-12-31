import { checkApiLimit, incrementApiLimit } from '@/lib/api-limit';
import { openai } from '@/lib/openai';
import { checkSubscription } from '@/lib/subscription';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse('Unauthorized', { status: 401 });

    const { prompt, amount = 1, reso = '512x512' } = await req.json();
    if (!prompt) return new NextResponse('Message required', { status: 400 });

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse(
        'Free trial has expired. Please upgrade to pro.',
        { status: 403 }
      );
    }

    const msg = await openai
      .createImage({
        prompt,
        n: parseInt(amount, 10),
        size: reso,
      })
      .then((res) => {
        return res.data.data;
      })
      .catch((err) => err);

    if (!isPro) await incrementApiLimit();

    return NextResponse.json(msg);
  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
