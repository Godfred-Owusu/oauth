// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import { OAuth2Client } from "google-auth-library";
// dotenv.config();

// const app = express();
// const port = 3000;
// app.use(express.json());
// app.use(cors());

// app.post("/", async (req, res) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Referrer-Policy", "no-referrer-when-downgrade");

//   const redirectURL = "http://127.0.0.1:3000/oauth";

//   const oAuth2Client = new OAuth2Client(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     redirectURL
//   );

//   const authorizedUrl = oAuth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: "https://www.googleaps.com/auth/userinfo.profile openid",
//     prompt: "consent",
//   });

//   res.json({ url: authorizedUrl });
// });

// async function getUserData(access_token) {
//   const response = await fetch(
//     `https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`
//   );
//   const data = await response.json();
//   console.log("data", data);
// }

// app.get("/", async (req, res) => {
//   const code = req.query.code;
//   try {
//     const redirectURL = "http://127.0.0.1:3000/oauth";
//     const oAuth2Client = new OAuth2Client(
//       process.env.CLIENT_ID,
//       process.env.CLIENT_SECRET,
//       redirectURL
//     );
//     const res = await oAuth2Client.getToken(code);
//     await oAuth2Client.setCredentials(res.tokens);
//     console.log("tokken acquired");
//     const user = oAuth2Client.credentials;
//     console.log(user);
//     await getUserData(user.access_token);
//   } catch (err) {
//     console.log("Error with Signing in with Google");
//   }
// });
// app.listen(port, () =>
//   console.log(`Server running on http://localhost:${port}`)
// );

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Endpoint to generate Google OAuth URL
app.post("/request", (req, res) => {
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
});

// Fetch user data from Google API
async function getUserData(access_token) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  const data = await response.json();
  console.log("User data:", data);
  return data;
}

// OAuth callback endpoint
app.get("/oauth", async (req, res) => {
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
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
