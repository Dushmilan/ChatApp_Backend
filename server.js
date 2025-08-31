const app=require("express")();
const http=require("http").createServer(app);
const io=require("socket.io")(http);
const dotenv=require("dotenv");
dotenv.config();

const PORT=process.env.PORT||3000;

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

io.on("connection",(socket)=>{
    socket.broadcast.emit("hi");
    socket.on("chat message",msg=>{
        io.emit("chat message",msg);
    });
});

http.listen(PORT,()=>{
    console.log(`listening on *:${PORT}`);
});


app.use("/auth",require("./Routes/authRouter"));
/** 
app.use("/message",require("./routes/message"));
app.use("/user",require("./routes/user"));
**/