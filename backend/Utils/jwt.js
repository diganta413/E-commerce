const jwt = require("jsonwebtoken")
require("dotenv").config()

const authenticate = (req,res,next) => {
    const header = req.headers["authorization"];
    const token = header && header.split(' ')[1];
    if(token!=null)
    {
        jwt.verify(token,process.env.SECRET,(err,user) => {
            if(err)
            {
                res.status(401).json({message: "Authentication error"})
            }
            else
            {
                req.user = user;
                next();
            }
        })
    }
}
module.exports = authenticate;