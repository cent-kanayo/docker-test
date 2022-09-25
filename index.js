const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");

const { createClient } = require("redis");
let RedisStore = require("connect-redis")(session);

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  SESSION_SECRET,
  REDIS_PORT,
  REDIS_URL,
} = require("./config/config");

let redisClient = createClient({
  legacyMode: true,
  socket: {
    port: REDIS_PORT,
    host: REDIS_URL,
  },
});

redisClient.connect().catch(console.error);
const app = express();

const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
app.use(cors({}));
app.use(express.json());
app.enable("trust proxy");
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "myjnjf;nnj;kj;okmko'ipo'",
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 3000000,
    },
  })
);

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/api/v1", (req, res) => {
  res.send("<h2>Hey There!!! Hello hi there Are you still with me!!!!.</h2>");
  console.log("It ran");
});

const port = 5000;

const start = async () => {
  await mongoose
    .connect(
      `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
    )
    .then(() => console.log("Successfully connected to database"))
    .catch((error) => console.log(error));
  app.listen(port, () => console.log(`Server listening on port ${port}`));
};
start();
