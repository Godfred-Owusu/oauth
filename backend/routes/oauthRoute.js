// routes/oauthRoutes.js
import express from "express";
import {
  generateAuthUrlController,
  oauthCallbackController,
} from "../controllers/oauthCtl.js";

const router = express.Router();

// Endpoint to generate Google OAuth URL
router.post("/request", generateAuthUrlController);

// OAuth callback endpoint
router.get("/oauth", oauthCallbackController);

export default router;
