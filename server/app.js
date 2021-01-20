const express = require("express");
const messages = require("./utils/messages");
const Message = require("./message.model");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/send", async (req, res) => {
  const { sender, receiver, message, subject, creationDate } = req.body;

  let newMsg = new Message(sender, receiver, message, subject, creationDate);
  messages.sendMessage(newMsg);

  res.send(newMsg);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
