const express = require("express");
const router = new express.Router();
const utils = require("../utils/users");
const auth = require("../utils/auth");

router.post("/users/signup", async (req, res) => {
  try {
    let newUser = await utils.signup(req);

    res.status(201).send({
      message: `New user '${newUser.username}' has signed up (id = ${newUser.userId}))`,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    let user = await utils.login(req);

    res
      .status(200)
      .send({
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

module.exports = router;
