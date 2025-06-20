import { Request, Response } from "express";
import { postToLinkedIn } from "../services/linkedinService";

export const shareToLinkedIn = async (req: Request, res: Response) => {
  const { accessToken, userLinkedInId, ...payload } = req.body;

  try {
    const result = await postToLinkedIn(accessToken, userLinkedInId, payload);
    res.status(200).json({ message: "Posted!", data: result });
  } catch (error) {
    res.status(500).json({ error: "LinkedIn post failed", details: error });
  }
};
