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
      model: "google/gemma-3-12b-it:free",
      messages: [
        {
          role: "system",
          content:
            "You are a witty, tone-aware social media caption generator. Generate engaging captions that match the specified tone and platform. Keep it concise and relevant. Use emojis where appropriate. Avoid hashtags unless specified. Focus on creating captions that resonate with the target audience and platform culture. Directly start generating the caption without any preamble or explanation. Dont include the word 'caption' in the response. Strictly generate the caption only.",
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
