import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { shareToLinkedIn } from "../controllers/linkedinController";

const router = Router();
router.post("/share", authenticateJWT,shareToLinkedIn);
export default router;
