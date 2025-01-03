import { OAuth2Client } from "google-auth-library";

export const generateAuthUrlControllerTrial = (req, res) => {
  const redirectURL = "http://127.0.0.1:3000/oauth";

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectURL
  );

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/userinfo.profile", "openid"],
    prompt: "consent",
  });

  res.json({ url: authUrl });
};

async function getUserData(access_token) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  const data = await response.json();
  console.log("User data:", data);
  return data;
}

export const oauthCallbackControllerTrial = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send("No code provided.");
  }

  try {
    const redirectURL = "http://127.0.0.1:3000/oauth";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL
    );

    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    console.log(tokens);
    const userData = await getUserData(tokens.access_token);

    res.json({ message: "Authentication successful!", userData });
  } catch (error) {
    console.error("Error during OAuth process:", error.message);
    res.status(500).send("Error during Google OAuth process.");
  }
};
