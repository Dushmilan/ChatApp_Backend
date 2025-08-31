const auth_model=require('../Model/auth_model');



async function register(req,res){
    const {email}=req.body;
    const isUser=await auth_model.isUser(email);
    if(isUser){
        return res.status(400).send('User already exists');
    }
    auth_model.register(req,res);
    
}

async function login(req,res){
   const {email}=req.body;
   const isUser=await auth_model.isUser(email);
   if(!isUser){
       return res.status(400).send('User does not exist');
   }
    auth_model.login(req,res);
}


module.exports={register,login};