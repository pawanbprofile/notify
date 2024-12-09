import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import express, { json } from "express";
import cors from "cors";
import admin from "firebase-admin";
import serviceAccount from "fir-rndemo-524ce-firebase-adminsdk-ydg52-dd1499a7b4.json";

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

initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "fir-rndemo-524ce",
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
  getMessaging()
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
