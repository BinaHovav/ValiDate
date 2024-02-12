"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIdealPartner = void 0;
const openai_1 = require("openai");
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
                    content: `According to the bio provided, please write a brief description of an ideal match in 2-3 sentences.
                    Also,  using short titles, list 3 or 4 places where the user might find a match
                    (e.g., Local Library, Beach, etc.)`,
                },
            ],
            model: 'gpt-3.5-turbo',
            temperature: 0.5,
        });
        const idealPartnerProfile = (_b = (_a = chatCompletion.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content;
        return idealPartnerProfile;
    }
    catch (error) {
        console.error('Error generating ideal partner profile:', error);
    }
}
exports.generateIdealPartner = generateIdealPartner;
