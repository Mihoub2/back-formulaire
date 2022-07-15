const express = require("express");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const cors = require("cors");
const mg = mailgun.client({
  username: "Mihoub",
  key: "process.env.API-KEY",
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", (req, res) => {
  console.log(req.body);

  try {
    mg.messages
      .create("process.env.LIST", {
        from: `${req.body.firstname} ${req.body.lastname} <${req.body.email}> `,
        to: "process.env.MAIL",
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
