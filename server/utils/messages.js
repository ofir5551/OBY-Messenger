const fs = require("fs").promises;
const filePath = __dirname + "/../storage/messages.storage.json";

const sendMessage = async (newMessage) => {
  try {
    let messagesArray = await loadMessages();

    // Save the new message to JSON file
    messagesArray.push(newMessage);
    await fs.writeFile(filePath, JSON.stringify(messagesArray));
  } catch (err) {
    throw new Error(err.message);
  }
};

const getMessages = async (userId) => {
  try {
    let messagesArray = await loadMessages();

    // Filter out messages that don't belong to the current user
    messagesArray = messagesArray.filter(
      (message) => message.receiver == userId
    );

    return messagesArray;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteMessage = async (index) => {
  try {
    let messagesArray = await loadMessages();

    // Deletes the message from the messages array and saves it
    let deletedMsg = messagesArray.splice(index, 1);

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

module.exports = {
  sendMessage,
  getMessages,
  deleteMessage,
};