const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your_email@gmail.com",
        pass: "your_app_password"
      }
    });

    await transporter.sendMail({
      from: email,
      to: "your_email@gmail.com",
      subject: `Message from ${name}`,
      text: message
    });

    res.send("Message sent successfully ✅");
  } catch (error) {
    res.send("Error sending message ❌");
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));