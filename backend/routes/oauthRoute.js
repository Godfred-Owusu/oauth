// routes/oauthRoutes.js
import express from "express";
import {
  generateAuthUrlControllerTrial,
  oauthCallbackControllerTrial,
} from "../controllers/oauthCtl.js";

const router = express.Router();

router.post("/request", generateAuthUrlControllerTrial);
router.get("/oauth", oauthCallbackControllerTrial);
export default router;
