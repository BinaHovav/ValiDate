import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: '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',
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
          content: `According to the bio provided, please write a brief description of an ideal match in 2-3 sentences.
                    Also, using short titles, list 3 or 4 places where the user might find a match
                    (e.g., Local Library, Beach, etc.)`,
        },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.5,
    });

    const idealPartnerProfile =
      chatCompletion.choices[0]?.message?.content;
    return idealPartnerProfile;
  } catch (error) {
    console.error('Error generating ideal partner profile:', error);
  }
}
