import {OPENAI_API_KEY} from '@env';
import {Configuration, OpenAIApi} from 'openai';

export default async function openAi(message, cb) {
  const model = 'gpt-3.5-turbo';
  // const testNAME = 'Miguel';
  const config = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);
  let messageContent = message;
  console.log(messageContent);

  await openai
    .createChatCompletion({
      model: model,
      max_tokens: 450,
      temperature: 0.4,
      messages: [
        {role: 'system', content: 'Your role is to create cover letters'},
        {
          role: 'user',
          content: messageContent,
        },
      ],
    })
    .then(res => {
      // console.log(res.data.choices[0].message);
      return cb(res.data.choices[0].message);
    })
    .catch(err => console.log(err.response.data));
}
