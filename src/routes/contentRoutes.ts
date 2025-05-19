import { Router } from "express";
import { createCaption } from "../controllers/contentController";
import { verifyToken } from "../middlewares/verifyTokens";

const router = Router();

router.post("/generate", verifyToken, createCaption);

export default router;
