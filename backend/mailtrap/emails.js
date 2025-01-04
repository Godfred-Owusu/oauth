import { transport, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipients = [{ email }];
  console.log(email, verificationToken, recipients);
  try {
    transport
      .sendMail({
        from: sender,
        to: recipients[0].email,
        subject: "Verify your email",
        html: `<h3> Your verification token is: ${verificationToken} </h3>`,
        category: "Email Validation",
      })
      .then(console.log, console.error);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send verification email.");
  }
};
