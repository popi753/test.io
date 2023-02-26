var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var User = require("../schema")



function validate(req,res,next) {
  if (req.session.user) {
            req.session.msg = "already authorized"
    return  res.redirect("/")
  }else{
    return next()
  }
}

function restrict(req,res,next) {
  if (!(req.session.user)) {
            req.session.msg = "u need to authorize"
    return  res.redirect("/")
  }else{
    return next()
  }
}



router.get('/',  function(req, res) {
  if (req.session.user) {
    req.session.msg = "already authorized"
  }
  res.render('index', {user:req.session.user, msg: req.session.msg});
});





router.get("/register", validate, (req, res)=>{
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
      req.session.user = user
      res.redirect("/profile")
      
    }

  })

})




router.get("/login", validate, (req, res)=>{
  res.render("login")
})

router.post("/login", async (req,res)=>{


User.findOne({username: req.body.Lusername}, (err, data)=>{
  if (err) {
    res.send(err)
  }
  else if (data) {
          if(data.password == req.body.Lpassword){
            req.session.user = data
            res.redirect("/profile")
          }else{
            res.render("login", {someerr : "2"})
          } 
  }  else{
    res.render("login", {someerr : "1"})
  }
})


})


router.get("/profile", restrict, (req,res)=>{
  res.render("profile", {user : req.session.user})
})

router.post("/logout", (req,res)=>{
  req.session.user = false
  req.session.msg = false
  res.redirect("/")
})



module.exports = router;
