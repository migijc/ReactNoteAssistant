import {OPENAI_API_KEY} from '@env';
import {Configuration, OpenAIApi} from 'openai';

export default async function openAi(listOfSubSections, noteToClassiy, cb) {
  const model = 'gpt-3.5-turbo';
  // const testNAME = 'Miguel';
  const config = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);
  console.log(listOfSubSections)
  console.log(noteToClassiy)

  await openai
    .createChatCompletion({
      model: model,
      max_tokens: 7,
      temperature: 0,
      messages: [
        {
          role: 'user',
          content: `${getInitialUserMessage(listOfSubSections, noteToClassiy)}`,
        },
      ],
    })
    .then(res => {
      // console.log(res.data.choices[0].message);
      return cb(res.data.choices[0].message);
    })
    .catch(err => console.log(err.response.data));
}
function getInitialUserMessage(list, note) {
  const initialUserMessage = `Please provide an absolute answer. Ideally, the answer should contain only one word, unless the subsection is composed of several words, in which case you should provide the complete subsection name. Consider the following list of sub-categories in array [${list},] which is separated by a comma. The note to consider is "${note}" If the note can be classified with an existing item from the list, please return that item. Otherwise, please return a new sub-category title. If the note is not relevant, please reply with "false".`;
  console.log(initialUserMessage)
  return initialUserMessage;
}