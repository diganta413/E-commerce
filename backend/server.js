const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./Models/User");
const register = require("./Routes/user")
const product = require("./Routes/product")
const categories = require("./Routes/category")
const admin = require("./Routes/admin")

require("dotenv").config();
const app = express();
mongoose.connect(`mongodb+srv://digu:${process.env.DATABASE_PASSWORD}@cluster0.4oo3o.mongodb.net/E-commerce`, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());
app.use(cors());

app.get("/",(req,res) => {
    res.send("Hello");
})

app.use("/api",register);
app.use("/products",product);
app.use("/category",categories);
app.use("/admin",admin)



app.listen(process.env.PORT,()=>{
    console.log(`App is running on port ${process.env.PORT}`)
})