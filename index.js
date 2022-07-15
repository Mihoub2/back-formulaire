const express = require("express");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const cors = require("cors");
const mg = mailgun.client({
  username: "Mihoub",
  key: "09caf4c5d3ea944a9f75ab7fdaa77a2a-18e06deb-ef754876",
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", (req, res) => {
  console.log(req.body);

  try {
    mg.messages
      .create("sandbox999e13d74f6d4fce8d2eef2d44360a93.mailgun.org", {
        from: `${req.body.firstname} ${req.body.lastname} <${req.body.email}> `,
        to: "debache.mihoub@gmail.com",
        subject: req.body.subject,
        text: req.body.message,
      })
      .then((msg) => res.json(msg.message))
      .catch((err) => res.json(err.message));
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.all("*", (req, res) => {
  res.status(404).json(error.message);
});
app.listen(3000, () => {
  console.log("Server gogogo!");
});
