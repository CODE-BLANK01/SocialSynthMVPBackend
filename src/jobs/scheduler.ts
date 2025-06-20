import { Worker } from "bullmq";
import IORedis from "ioredis";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import axios from "axios";
import { postToLinkedIn } from "../services/linkedinService";

dotenv.config();

const connection = new IORedis(
  process.env.REDIS_URL || "redis://localhost:6379"
);
const prisma = new PrismaClient();

new Worker(
  "post-queue",
  async (job: any) => {
    try {
      const post = await prisma.post.findUnique({
        where: { id: job.data.postId },
      });
      if (!post) {
        console.error(`❌ Post not found for ID ${job.data.postId}`);
        return;
      }

      const platformAccount = await prisma.platformAccount.findFirst({
        where: {
          userId: post.userId,
          platform: "linkedin",
        },
      });

      if (!platformAccount) {
        console.error(`❌ No LinkedIn account linked for user ${post.userId}`);
        return;
      }

      const profile = await axios.get("https://api.linkedin.com/v2/me", {
        headers: {
          Authorization: `Bearer ${platformAccount.accessToken}`,
        },
      });

      const linkedinId = profile.data.id;

      // Construct LinkedInPostPayload
      await postToLinkedIn(platformAccount.accessToken, linkedinId, {
        type: post.type as "text" | "article" | "image",
        text: post.content,
        url: post.url ?? undefined,
        imagePath: post.imagePath ?? undefined,
        title: post.title ?? undefined,
        description: post.description ?? undefined,
      });

      console.log(`✅ Posted to LinkedIn for user ${post.userId}`);
    } catch (err) {
      console.error("❌ Error posting to LinkedIn:", err);
    }
  },
  { connection }
);
