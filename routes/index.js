var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../schema")


router.get('/', function(req, res) {
  res.render('index',);
});


router.get("/login", (req, res)=>{

    res.render("login")

})

router.get("/register", (req, res)=>{
  res.render("register")
})



router.post("/register", async (req, res)=>{

 

  const user = new User({
    username: req.body.Rusername,
    password: req.body.Rpassword
  })

  user.save(async (err,saveduser)=>{
    if (err) {
      console.log(err)
      console.log(`this is fucking code ${err.code}`)
                  
          
          if (err.code ==11000) {
              res.render("register", {
                username : req.body.Rusername,
                password : req.body.Rpassword,
                someerr  : err.code
             })
          }
      } 
    
    else {
      console.log("nigga saved")
      // res.render("profile", {name : saveduser.username})
      res.redirect("/profile")
      
    }

  })

})


router.get("/profile", (req,res)=>{
  res.render("profile")
})



module.exports = router;
