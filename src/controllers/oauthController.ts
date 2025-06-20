import axios from "axios";
import * as jwt_decode from "jwt-decode";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const clientId = process.env.LINKEDIN_CLIENT_ID!;
const clientSecret = process.env.LINKEDIN_CLIENT_SECRET!;
const redirectUri = process.env.LINKEDIN_REDIRECT_URI!;

export const initiateLinkedInAuth = (req: Request, res: Response) => {
  const userId = req.query.userId as string; // frontend should append this
  const state = userId; // pass userId to track user in callback

  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=openid%20profile%20email&state=${state}`;

  res.redirect(authUrl);
};

export const handleLinkedInCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const userId = req.query.state as string; // state contains userId

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

  // Decode ID token to get user identity
  const decoded: any = (jwt_decode as unknown as (token: string) => any)(
    id_token
  );
  const linkedinId = decoded.sub;

  // Save accessToken & LinkedIn ID
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

  res.redirect("/dashboard"); // or your app home
};
