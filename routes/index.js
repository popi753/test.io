var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../schema")
var active = false


router.get('/', function(req, res) {
  res.render('index',);
});


router.get("/login", (req, res)=>{
  if (active) {
    res.send("already logged in")
  } else {
    res.render("login")

  }
})

router.get("/register", (req, res)=>{
  res.render("register")
})

router.post("/profile", (req, res)=>{
  const user = new User({
    username: req.body.Rusername,
    password: req.body.Rpassword
  })



  user.save(async (err,saveduser)=>{
    if (err) {
      console.log(err)
    } else {
      console.log("nigga saved")
      active = true
      res.render("profile", {name : saveduser.username})
      
    }

  })

})

module.exports = router;
