const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const send = require("../sendmail")
const jwt = require("jsonwebtoken");
const authenticate = require("../Utils/jwt");

const salts = 10;

router.post("/register",(req,res) => {
  bcrypt.hash(req.body.password, salts, function(err, hash) {
    const user = new User({
      firstname: req.body.fullname,
      email: req.body.email,
      password: hash
    })
    user.save()
    .then((data)=> {
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
      bcrypt.compare(password, user.password, function(err, result) {
        if(result == true)
        {
          var token = jwt.sign({ _id: user._id }, 'Secrettoken',{expiresIn: '30d'});
          res.status(200).json({token: token,_id: user._id,email: user.email,password: user.password, role: user.role});
        }
      });
    }
  })
})

router.post("/:id",authenticate,(req,res)=>{
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