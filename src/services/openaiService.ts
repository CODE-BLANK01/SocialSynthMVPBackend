import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // or your site URL (for OpenRouter ranking)
    "X-Title": "Social Synth", // Your app name
  },
});

export const generateCaption = async (prompt: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.3-8b-instruct:free",
      messages: [
        {
          role: "system",
          content:
            "You are a witty, tone-aware social media caption generator.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return completion.choices[0].message?.content?.trim() || "";
  } catch (error) {
    console.error("Caption generation error:", error);
    throw new Error("Failed to generate caption");
  }
};
