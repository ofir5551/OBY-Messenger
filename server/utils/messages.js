const fs = require("fs/promises");

const sendMessage = async (newMessage) => {
  // Load messages array from JSON file
  let dataBuffer = await fs.readFile("messages.json");
  let jsonString = dataBuffer.toString();
  let messagesArray = JSON.parse(jsonString);


  messagesArray.push(newMessage);

  //console.log(newMsg);

  // Append the new message to JSON file
  await fs.writeFile("messages.json", JSON.stringify(messagesArray));
}



module.exports = {
    sendMessage
}