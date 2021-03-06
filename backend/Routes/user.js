const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const send = require("../Utils/sendmail")
const jwt = require("jsonwebtoken");
const authenticate = require("../Utils/jwt");
const crypto = require("crypto");
const product = require("../Models/Products");

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
          res.status(200).json({_id: user._id,token: token,email: user.email,role: user.role,name: user.fullname});
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

router.post("/:id/add_like",(req,res) => {
  const user_id = req.params.id;
  const prod = req.body.prod;
  User.findOne({_id:user_id},(err,user) => {
    if(err)
    res.status(400).send(err)
    else
    {
      const Product = product.Product;
      Product.findOne({_id: prod},(err,product) => {
        if(user.Liked_items)
        {
          var liked_items = user.Liked_items
          liked_items.push(product)
          
        }
        else
        {
          var liked_items = [product]
        }
        
        User.findOneAndUpdate({_id:user._id},{Liked_items: liked_items},(err,docs) => {
          if(err)
          res.status(400).send(err)
          else
          res.status(200).send(docs)
        }) 
      })

        
      
    }
  })
})

router.post("/:id/delete_like",(req,res) => {
  const user_id = req.params.id;
  const prod = req.body.prod;
  User.findOne({_id: user_id},(err,user) => {
    if(err)
    {
      res.status(400).send(err)
    }
    else
    {
      var liked_items = user?.Liked_items;
      liked_items.forEach((element,index) => {
        if(element._id == prod)
        {
            liked_items.splice(index,1,element)
        }
      });
      User.findOneAndUpdate({_id: user_id},{Liked_items: liked_items},(err,docs) => {
        if(err)
        res.status(400).send(err)
        else
        res.status(200).send(docs)
      })
    }
  })
})

module.exports = router;