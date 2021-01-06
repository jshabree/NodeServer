const express = require("express");
const router = express.Router();
const User = require("../models/user");
const db = require("../config/keys").MongodbURI;

router.get("/", (req, res) => {
  res.send({ message: "hello" });
});

router.post("/adduser", (req, res) => {
  let user = new User(req.body);
  user
    .save()
    .then(user => {
      res.status(200).send("success");
    })
    .catch(err => {
      res.status(400).send("Failed");
    });
});


router.post("/validateuser", async (req, res) => {

    try{
   let userrecord = await User.find(
        { email: req.body.email },
     )
    console.log(userrecord, req.body.email, req.body.password)
    if((userrecord[0].email === req.body.email) && (userrecord[0].password === req.body.password) ){
        res.json({message: "user exist"});
     }
    else{
        res.status(400).json({message: "user not found"});
     }
    }
    catch{
        console.log("err")
    }
  });


router.get("/getuser", (req, res) => {
  User.find((err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

module.exports = router;