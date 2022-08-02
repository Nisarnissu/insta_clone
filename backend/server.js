const express = require("express");
const mongoose = require("mongoose");
const userModule = require("./userModules/userSchema");
const multer = require("multer");

const image = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontend/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const upload = multer({ storage: image });

app.listen(3002, (err) => {
  if (!err) {
    console.log("Server started at localhost 3002");
  } else {
    console.log(err);
  }
});

mongoose.connect(
  "mongodb://localhost/Insta_backend",
  () => {
    console.log("DB connected");
  },
  (err) => {
    console.log(err);
  }
);

app.get("/get", (req, res) => {
  res.send("Server started with {PM}");
});

app.post("/post", upload.single("image"), (req, res) => {
  userModule
    .create({
      name: req.body.name,
      location: req.body.location,
      description: req.body.description,
      image: req.body.image,
    })
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get("/userdata", (req, res) => {
  userModule.find().then((userdata) => {
    res.send(userdata);
  }).catch((err)=>{
    res.send(err)
  })
});
