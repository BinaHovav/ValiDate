import { OpenAI } from 'openai';
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function generateIdealPartner(bio: string) {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Here is my bio: ' + bio },
        {
          role: 'assistant',
          content: `According to the bio provided, please write a brief description of an ideal match in 2 sentences.
                    Also, write "Here are places you may find him:" and then please provide a numbered list from 1 to 4 of places where the user might find a match
                    (e.g., Local Library, Beach, etc.), without a description of the place`,
        },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.5,
    });

    const idealPartnerProfile = chatCompletion.choices[0]?.message?.content;
    return idealPartnerProfile;
  } catch (error) {
    console.error('Error generating ideal partner profile:', error);
  }
}
