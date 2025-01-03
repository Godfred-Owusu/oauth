// controllers/oauthController.js
import { generateAuthUrl, handleOAuthCallback } from "../oauth.js";

// Controller to generate Google OAuth URL
export const generateAuthUrlController = (req, res) => {
  try {
    const authUrl = generateAuthUrl();
    res.json({ url: authUrl });
  } catch (error) {
    res.status(500).json({ message: "Error generating auth URL", error });
  }
};

// Controller to handle OAuth callback
export const oauthCallbackController = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("No code provided.");
  }

  try {
    const { tokens, userData } = await handleOAuthCallback(code);
    res.json({ message: "Authentication successful!", userData, tokens });
  } catch (error) {
    console.error("Error during OAuth process:", error.message);
    res.status(500).send("Error during Google OAuth process.");
  }
};
