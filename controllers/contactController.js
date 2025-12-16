import { sendEmail } from "../utils/sendEmail.js";

export const sendContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await sendEmail(
      process.env.SMTP_USER, // send to YOUR mail
      "New Contact Form Message",
      `
      <h2>New Contact Form Message</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Message:</b></p>
      <p>${message}</p>
      `
    );

    res.json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("CONTACT FORM ERROR:", err);
    res.status(500).json({ message: "Failed to send message" });
  }
};
