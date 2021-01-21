const fs = require("fs").promises;
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const filePath = __dirname + "/../storage/users.storage.json";

const signup = async (req) => {
  try {
    const { username, password } = req.body;
    let newUser = new User(username, password);

    let usersArray = await loadUsers();

    // Check if username already exists
    if (usersArray.some((user) => user.username === newUser.username)) {
      throw new Error(`The username '${newUser.username}' already exists.`);
    }

    newUser.userId = await assignUserId();
    // Save the new user to JSON file
    usersArray.push(newUser);
    await fs.writeFile(filePath, JSON.stringify(usersArray));

    return newUser;
  } catch (err) {
    throw new Error(err.message);
  }
};

const login = async (req) => {
  try {
    let usersArray = await loadUsers();
    let user = validateCredentials(req, usersArray);

    // Generate a JWT and save to JSON file
    user.token = generateAuthToken(user);

    let index = usersArray.findIndex(
      (element) => element.userId == user.userId
    );
    usersArray[index] = user;
    await fs.writeFile(filePath, JSON.stringify(usersArray));

    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const logout = async (user) => {
  let usersArray = await loadUsers();
  delete user.token;

  let index = usersArray.findIndex((element) => element.userId == user.userId);
  usersArray[index] = user;
  await fs.writeFile(filePath, JSON.stringify(usersArray));

  return user;
};

// --------------- Private methods ---------------
const loadUsers = async () => {
  let file = await fs.readFile(filePath);
  let jsonString = file.toString();
  let usersArray = JSON.parse(jsonString);

  return usersArray;
};

const assignUserId = async () => {
  let usersArray = await loadUsers();

  // If first user in data storage - assign id '1'
  if (usersArray.length == 0) {
    return 1;
  } else {
    return usersArray[usersArray.length - 1].userId + 1;
  }
};

const generateAuthToken = (user) => {
  const token = jwt.sign({ userId: user.userId }, "ofirbenyamin");

  return token;
};

const validateCredentials = (req, usersArray) => {
  const { username, password } = req.body;
  const user = usersArray.find((element) => element.username == username);

  if (!user) {
    throw new Error(`Username '${username}' does not exist.`);
  } else {
    if (user.password != password) {
      throw new Error(`Incorrect password`);
    }
  }

  return user;
};

const findUserById = async (userId) => {
  let usersArray = await loadUsers();
  let user = usersArray.find((element) => element.userId === userId);

  return user;
};

module.exports = {
  signup,
  login,
  logout,
  findUserById,
};
