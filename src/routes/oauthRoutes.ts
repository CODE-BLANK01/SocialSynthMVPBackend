import { Router } from "express";
import {
  initiateLinkedInAuth,
  handleLinkedInCallback,
} from "../controllers/oauthController";

const router = Router();

router.get("/linkedin", initiateLinkedInAuth);
router.get("/linkedin/callback", handleLinkedInCallback);

export default router;
