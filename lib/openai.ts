import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessage,
  Configuration,
  CreateImageRequestSizeEnum,
  OpenAIApi,
} from 'openai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// * Converation

const createChatCompletion = async (
  messages: ChatCompletionRequestMessage[]
) => {
  const res = await openai
    .createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    })
    .then((res) => res.data.choices[0].message)
    .catch((err) => {
      return {
        role: 'system',
        content: `Jenius was unable to find an answer for that ! (Error: ${err.message})`,
      } as ChatCompletionRequestMessage;
    });
  return res;
};

const instructionMsg: ChatCompletionResponseMessage = {
  role: 'system',
  content:
    'You are a code generator. You must answer only in markdown code sinppets. Use code comments for explanations',
};

const createCodeCompletion = async (
  messages: ChatCompletionRequestMessage[]
) => {
  const res = await openai
    .createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [instructionMsg, ...messages],
    })
    .then((res) => res.data.choices[0].message)
    .catch((err) => {
      return {
        role: 'system',
        content: `Jenius was unable to find an answer for that ! (Error: ${err.message})`,
      } as ChatCompletionRequestMessage;
    });
  return res;
};

// * Image Gen

const createImage = async (
  prompt: string,
  n: number,
  size: CreateImageRequestSizeEnum
) => {
  const res = await openai
    .createImage({
      prompt,
      n,
      size,
    })
    .then((res) => res.data.data)
    .catch((err) => err);
  return res;
};

export {
  type ChatCompletionRequestMessage,
  createChatCompletion,
  createCodeCompletion,
  createImage,
};
