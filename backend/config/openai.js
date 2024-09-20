// /config/openai.js
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const queryLlama = async (input) => {
  try {
    const response = await openai.createCompletion({
      model: "llama-3.1", // The LLaMA 3.1 model
      prompt: input,
      max_tokens: 150,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error("Error querying LLaMA:", error);
    throw error;
  }
};

module.exports = queryLlama;
