const auth_controller=require("../Controller/auth_controller");
const auth_Middleware=require("../Middleware/auth_Middleware");



const router=require("express").Router();






router.post("/register",auth_Middleware,auth_controller.register);
router.post("/login",auth_Middleware,auth_controller.login);
module.exports=router;