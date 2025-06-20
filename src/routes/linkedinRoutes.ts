import { Router } from "express";
import { shareToLinkedIn } from "../controllers/linkedinController";

const router = Router();
router.post("/share", shareToLinkedIn);
export default router;
