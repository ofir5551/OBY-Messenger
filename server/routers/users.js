const express = require("express");
const router = new express.Router();
const utils = require("../utils/users");
const auth = require("../utils/auth");

router.post("/users/signup", async (req, res) => {
  try {
    let newUser = await utils.signup(req);

    res
      .status(201)
      .send({
        user: newUser.username,
        userId: newUser.userId,
        token: newUser.token,
      });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    let user = await utils.login(req);

    res.status(200).send({
      username: user.username,
      userId: user.userId,
      token: user.token,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    let user = await utils.logout(req.user);

    res.status(200).send({
      message: `User: ${user.username} (id: ${user.userId}) successfully logged out`,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/users/list", async (req, res) => {
  try {
    let usersList = await utils.getList();

    res.status(200).send(usersList);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/users/getUsername/:id", async (req, res) => {
  try {
    let username = await utils.getUsernameById(req);

    res.status(200).send({username: username});
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
