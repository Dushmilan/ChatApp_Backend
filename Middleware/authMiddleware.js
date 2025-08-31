const jwt= require('jsonwebtoken');
const dotenv=require('dotenv');
module.exports=(req,res,next)=>{
    let token=req.header('Authorization');
    if(!token) return res.status(401).send('Access Denied');
    try{
        if(token.startsWith('Bearer ')) token=token.slice(7,token.length).trimLeft();
        const verified=jwt.verify(token,process.env.TOKEN_SECRET);
        req.user=verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }

};


