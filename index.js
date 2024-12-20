const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const serviceAccount = require("./fir-rndemo-524ce-firebase-adminsdk-ydg52-3e8d76ddda.json");
process.env.GOOGLE_APPLICATION_CREDENTIALS;
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post("/send", function (req, res) {
  const receivedToken = req.body.fcmToken;
  const message = {
    notification: {
      title: "Notif",
      body: "This is a test notification",
    },
    token:
      "cJhKKyFUTXy60uva2fkOVJ:APA91bGVm7_U6ZSCqnqDxsoRnvzbr_yaXKebE9E1k2xH4m3jkL60JC3PGjsW56gHhPyDWWrnEf9I5WP9TOYWuJvIvBuPAMCD49LOQ2RsM8REM5ea7RLqQwY",
  };
  admin
    .messaging()
    .send(message)
    .then((response) => {
      res
        .status(200)
        .json({ message: "Succesfully sent message", token: receivedToken });
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.log("Error sending message ", error);
    });
});

app.listen(3000, function () {
  console.log("Server started on  port 3000");
});
