const db= require('../Database/mysql');
const bcrypt = require('bcrypt');

const register=async(req,res)=>{
    const {name,email,password}=req.body;
    const hashPassword=await bcrypt.hash(password,10);
    const sql=`INSERT INTO users(name,email,password) VALUES(?,?,?)`;
    db.query(sql,[name,email,hashPassword],(err,result)=>{
        if(err) throw err;
        res.send("User registered");
    })
}

const login=async(req,res)=>{
    const {email,password}=req.body;
    const sql=`SELECT * FROM users WHERE email=?`;
    db.query(sql,[email],async(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            const isMatch=await bcrypt.compare(password,result[0].password);
            if(isMatch){
                res.send("User logged in");
            }else{
                res.send("Invalid Password");
            }
        }else{
            res.send("User does not exist");
        }
    })
}

const isUser=async(email)=>{
    return new Promise((resolve, reject) => {
        const sql=`SELECT * FROM users WHERE email=?`;
        db.query(sql,[email],(err,result)=>{
            if(err) reject(err);
            resolve(result.length > 0);
        });
    });
}
module.exports={register,login,isUser};