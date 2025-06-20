import axios from "axios";
import fs from "fs";
import { LinkedInPostPayload } from "../types/linkedin";

const registerImageUpload = async (accessToken: string, authorUrn: string) => {
  const res = await axios.post(
    "https://api.linkedin.com/v2/assets?action=registerUpload",
    {
      registerUploadRequest: {
        recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
        owner: authorUrn,
        serviceRelationships: [
          {
            relationshipType: "OWNER",
            identifier: "urn:li:userGeneratedContent",
          },
        ],
      },
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.value; // includes uploadUrl and asset URN
};

const uploadImageToLinkedIn = async (
  uploadUrl: string,
  imagePath: string
): Promise<void> => {
  const image = fs.createReadStream(imagePath);

  await axios.put(uploadUrl, image, {
    headers: { "Content-Type": "application/octet-stream" },
  });
};

export const postToLinkedIn = async (
  accessToken: string,
  authorId: string,
  payload: LinkedInPostPayload
) => {
  const authorUrn = `urn:li:person:${authorId}`;
  let media = [];

  if (payload.type === "image" && payload.imagePath) {
    const imageUpload = await registerImageUpload(accessToken, authorUrn);
    const uploadUrl =
      imageUpload.uploadMechanism[
        "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
      ].uploadUrl;
    await uploadImageToLinkedIn(uploadUrl, payload.imagePath);

    media.push({
      status: "READY",
      description: { text: payload.description || "" },
      media: imageUpload.asset,
      title: { text: payload.title || "" },
    });
  }

  const body = {
    author: authorUrn,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: payload.text,
        },
        shareMediaCategory:
          payload.type === "article"
            ? "ARTICLE"
            : payload.type === "image"
            ? "IMAGE"
            : "NONE",
        ...(payload.type === "article" && payload.url
          ? {
              media: [
                {
                  status: "READY",
                  description: { text: payload.description || "" },
                  originalUrl: payload.url,
                  title: { text: payload.title || "" },
                },
              ],
            }
          : payload.type === "image"
          ? { media }
          : {}),
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
    },
  };

  const response = await axios.post(
    "https://api.linkedin.com/v2/ugcPosts",
    body,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Restli-Protocol-Version": "2.0.0",
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
