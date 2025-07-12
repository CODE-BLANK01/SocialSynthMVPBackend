import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const clientId = process.env.LINKEDIN_CLIENT_ID!;
const clientSecret = process.env.LINKEDIN_CLIENT_SECRET!;
const redirectUri = process.env.LINKEDIN_REDIRECT_URI!;

export const initiateLinkedInAuth = (req: Request, res: Response) => {
  const userId = (req.query.userId as string).trim(); // frontend should append this
  const state = userId; // pass userId to track user in callback

  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=w_member_social%20r_liteprofile%20r_emailaddress&state=${state}`;
  

  res.redirect(authUrl);
};

export const handleLinkedInCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const userId = req.query.state as string;

  try {
    const tokenRes = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { access_token, expires_in, id_token } = tokenRes.data;

    const decoded = jwtDecode<{ sub: string }>(id_token);
    const linkedinId = decoded.sub;

    await prisma.platformAccount.upsert({
      where: { userId_platform: { userId, platform: "linkedin" } },
      update: {
        accessToken: access_token,
        externalId: linkedinId,
        expiresAt: new Date(Date.now() + expires_in * 1000),
      },
      create: {
        userId,
        platform: "linkedin",
        accessToken: access_token,
        externalId: linkedinId,
        expiresAt: new Date(Date.now() + expires_in * 1000),
      },
    });

    res.redirect("/dashboard");
  } catch (error: any) {
    console.error("❌ LinkedIn Token Exchange Error:", error.response?.data || error.message);
    res.status(500).json({
      message: "Token exchange failed",
      details: error.response?.data || error.message,
    });
  }
};

