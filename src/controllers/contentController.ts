import { Request, Response } from "express";
import { generateCaption } from "../services/openaiService";
import { AuthenticatedRequest } from "../middlewares/verifyTokens";

export const createCaption = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { platform, tone, context } = req.body;

  const prompt = `Generate a ${tone} caption for ${platform} about: ${context}`;

  try {
    const caption = await generateCaption(prompt);
    res.status(200).json({ caption });
  } catch (err) {
    res.status(500).json({ message: "Failed to generate caption", error: err });
  }
};
