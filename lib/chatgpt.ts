import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

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
        content: `ChatGPT was enbale to find an answer for that ! (Error: ${err.message})`,
      } as ChatCompletionRequestMessage;
    });
  return res;
};

export { createChatCompletion };
