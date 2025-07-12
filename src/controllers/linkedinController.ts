

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { postToLinkedIn } from "../services/linkedinService";

const prisma = new PrismaClient();

export const shareToLinkedIn = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user?.userId;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized: No user found in request" });
    return;
  }

  try {
    // Fetch the LinkedIn account details for the user
    const account = await prisma.platformAccount.findUnique({
      where: {
        userId_platform: {
          userId,
          platform: "linkedin",
        },
      },
    });

    if (!account) {
      res.status(404).json({ error: "LinkedIn account not connected for this user" });
      return;
    }

    const { accessToken, externalId } = account;
    const payload = req.body;

    const result = await postToLinkedIn(accessToken, externalId, payload);
    res.status(200).json({ message: "Posted to LinkedIn successfully!", data: result });
  } catch (error) {
    res.status(500).json({ error: "LinkedIn post failed", details: error });
  }
};


