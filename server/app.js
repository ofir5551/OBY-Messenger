const express = require("express");
const cors = require('cors')

const messagesRouter = require("./routers/messages");
const usersRouter = require("./routers/users");


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.use(express.static(process.cwd() + "/public"));
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html")
});

// Routers
app.use(messagesRouter);
app.use(usersRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
