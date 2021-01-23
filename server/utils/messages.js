const fs = require("fs").promises;
const Message = require("../models/message.model");
const filePath = __dirname + "/../storage/messages.storage.json";

const sendMessage = async (req) => {
  try {
    const { sender, receiver, message, subject, creationDate } = req.body;
    let newMessage = new Message(
      sender,
      receiver,
      message,
      subject,
      creationDate
    );

    let messagesArray = await loadMessages();

    // Save the new message to JSON file
    newMessage.msgId = await assignMessageId();
    messagesArray.push(newMessage);
    await fs.writeFile(filePath, JSON.stringify(messagesArray));

    return newMessage;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getMessages = async (userId) => {
  try {
    let messagesArray = await loadMessages();

    // Filter out messages that don't belong to the current user
    messagesArray = messagesArray.filter(
      (message) => message.receiver == userId || message.sender == userId
    );

    return messagesArray;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteMessage = async (msgId) => {
  try {
    msgId = Number(msgId);
    let messagesArray = await loadMessages();

    // Deletes the message from the messages array and saves it
    let messageIndex = messagesArray.findIndex(message => message.msgId === msgId);
    let deletedMsg = messagesArray.splice(messageIndex, 1);

    if (deletedMsg.length > 0) {
      await fs.writeFile(filePath, JSON.stringify(messagesArray));
    }

    return deletedMsg;
  } catch (err) {
    throw new Error(err.message);
  }
};

const loadMessages = async () => {
  let file = await fs.readFile(filePath);
  let jsonString = file.toString();
  let messagesArray = JSON.parse(jsonString);

  return messagesArray;
};

const assignMessageId = async () => {
  let messagesArray = await loadMessages();

  // If first message in data storage - assign id '1'
  if (messagesArray.length == 0) {
    return 1;
  } else {
    return messagesArray[messagesArray.length - 1].msgId + 1;
  }
};

module.exports = {
  sendMessage,
  getMessages,
  deleteMessage,
};
