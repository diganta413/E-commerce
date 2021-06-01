const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const send = require("../Utils/sendmail")
const jwt = require("jsonwebtoken");
const authenticate = require("../Utils/jwt");
const crypto = require("crypto");

const salts = 10;

router.get("/verify/:token",(req,res) => {
  const token = req.params.token;
  User.findOne({VerificationToken: token},function(err,user){
    if(user)
      {user.isVerified = true
      user.save()
      .then((user) => res.status(200).send("User verified successfully"))
      .catch((err) => res.status(204).send("Verification failed"))
    }
    if(err)
    {
      res.status(204).send("Invalid token");
    }
  })
})

router.post("/register",(req,res) => {
  bcrypt.hash(req.body.password, salts, function(err, hash) {
    const user = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hash
    })
    const token = crypto.randomBytes(20).toString("hex");
    user.VerificationToken = token;
    user.save()
    .then((data)=> {
    send(user.email,user.fullname,token);
    res.status(200).json(user);
    })
    .catch((err)=> {
    console.log(err);
    })
  });
    
})

router.post("/login",(req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email: email},(err,user) => {
    if(err){
      res.send("user not found");
    }
    else{
      if(user.isVerified == false)
      {
        res.status(204).send("User not verified")
      }
      else
      {bcrypt.compare(password, user.password, function(err, result) {
        if(result == true)
        {
          var token = jwt.sign({ _id: user._id }, 'Secrettoken',{expiresIn: '30d'});
          res.status(200).json({token: token,email: user.email,role: user.role,name: user.fullname});
        }
      });
    }
  }
  })
})

router.get("/:id",authenticate,(req,res)=>{
  var id = req.params.id;
  User.findOne({_id:id},(err,user) => {
    if(err){
      res.status(400).json({message: "User not found"})
    }
    else
    {
      res.status(200).json(user);
    }
  })
})

module.exports = router;