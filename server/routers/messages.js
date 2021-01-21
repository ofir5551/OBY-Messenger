const express = require("express");
const router = new express.Router();
const Message = require("../models/message.model");
const utils = require("../utils/messages");

router.post("/messages/send", async (req, res) => {
  try {
    const { sender, receiver, message, subject, creationDate } = req.body;
    let newMsg = new Message(sender, receiver, message, subject, creationDate);

    await utils.sendMessage(newMsg);

    res.status(201).send({
      message: `The message has been sent to (userId: ${newMsg.receiver}) successfully`,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/messages/get/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    let userMessages = await utils.getMessages(userId);

    res
      .status(200)
      .send(
        userMessages.length > 0
          ? userMessages
          : { message: "You have no messages" }
      );
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete("/messages/delete/:index", async (req, res) => {
  try {
    const msgIndex = req.params.index;
    let deletedMsg = await utils.deleteMessage(msgIndex);

    res
      .status(200)
      .send(
        deletedMsg.length > 0
          ? { message: "This message has been deleted." }
          : { message: "No messages were deleted." }
      );
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
