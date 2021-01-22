const express = require("express");
const router = new express.Router();
const utils = require("../utils/messages");
const auth = require("../utils/auth");

router.post("/messages/send", async (req, res) => {
  try {
    let newMessage = await utils.sendMessage(req);

    console.log(newMessage);
    res.status(201).send({
      message: `The message has been sent to (userId: ${newMessage.receiver}) successfully`,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/messages/get", auth, async (req, res) => {
  try {
    let userMessages = await utils.getMessages(req.user.userId);

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
