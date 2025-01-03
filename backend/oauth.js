import { OAuth2Client } from "google-auth-library";
import fetch from "node-fetch"; // Ensure this is installed: `npm install node-fetch`

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = "http://127.0.0.1:3000/auth/oauth"; // Update this if needed

// Initialize OAuth2Client
const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

/**
 * Generate the Google OAuth URL
 * @returns {string} The generated auth URL
 */
export const generateAuthUrl = () => {
  return oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/userinfo.profile", "openid"],
    prompt: "consent",
  });
};

/**
 * Handle the OAuth callback
 * @param {string} code - The authorization code from the OAuth flow
 * @returns {Object} Tokens and user data
 */
export const handleOAuthCallback = async (code) => {
  // Exchange code for tokens
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);

  // Fetch user data from Google API
  const userData = await getUserData(tokens.access_token);

  return { tokens, userData };
};

/**
 * Fetch user data using access token
 * @param {string} accessToken - The access token
 * @returns {Object} The user's data
 */
const getUserData = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user data from Google API");
  }

  return response.json();
};
