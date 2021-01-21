const express = require("express");
const messagesRouter = require("./routers/messages");
const usersRouter = require("./routers/users");


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routers
app.use(messagesRouter);
app.use(usersRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
