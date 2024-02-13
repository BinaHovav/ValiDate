'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.generateIdealPartner = void 0;
const openai_1 = require('openai');
const openai = new openai_1.OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});
async function generateIdealPartner(bio) {
  var _a, _b;
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Here is my bio: ' + bio },
        {
          role: 'assistant',
          content: `According to the bio provided, please write a short description of an ideal match, in 1 sentences.
                 Then add 3 or 4 places where the user might find a match,
                 according to what he wrote in the bio.
                 The places should in short titles (i.e. Local Library, beach, etc.)`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });
    const idealPartnerProfile =
      (_b =
        (_a = chatCompletion.choices[0]) === null || _a === void 0
          ? void 0
          : _a.message) === null || _b === void 0
        ? void 0
        : _b.content; //This is a profile which is generated if there aren't matches found
    // setIdealPartnerResponse(idealPartnerProfile || '')
  } catch (error) {
    console.error('Error generating ideal partner profile:', error);
  }
}
exports.generateIdealPartner = generateIdealPartner;
