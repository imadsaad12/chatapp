const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User=require("./models/User")
const Room=require("./models/Room")
const { v4: uuidv4 } = require('uuid');
const http=require('http')
const {Server}=require('socket.io')

app.use(cors());
const server=http.createServer(app)
const io=new Server(server,{cors:{origin:"http://localhost:3000",methods:["GET","POST"]}})
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/chatapp")
  .then(() => server.listen(4000, console.log("Listining on port 4000")));

app.put('/users/:username',async (req,res)=>{
  const {username}=req.params
  try {
    const user=await User.findOne({username:username});
    const contact=await User.findOne({username:req.body.username});
   if(!contact){
    res.status(500).send("contact doesnot  exist")
   }
   user.contacts.map(i=>{
     if(i.username===req.body.username){
       res.status(500).send("contact already exist")
     }
   })
    const data={username:req.body.username,roomId:uuidv4(),image:contact.image}
    await User.findOneAndUpdate({_id:user._id},{ $push: { contacts: data } })
    res.send("contact added successfully")
  } catch (error) {
    console.log(error);
    res.status(500).send("No such user")
  }
})

app.get("/users/:username",async(req,res)=>{
  const {username}=req.params
  try {
    const user=await User.findOne({username:username})
    res.json(user.contacts)
  } catch (error) {
    console.log(error);
    res.status(500).send("No such user")
  }
})


io.on("connection",(socket)=>{
    socket.on("join-room",(data)=>{
        socket.join(data)
         console.log("user joined ",socket.id ,data)
    })

    socket.on("send-message",(data)=>{
        socket.to(data.room).emit("recive-message",data)
         console.log(data)
    })

    socket.on("disconnect",()=>{
         console.log('user disconncted ',socket.id)
    })
})

app.post('/messages',async(req,res)=>{
  const {room,author,message,time,to}=req.body;
  try {
    const Sender=await User.findOne({username:author});
    const Reciever=await User.findOne({username:to});
    const ChatRoom=await Room.findOne({room:room});
    if(Reciever.contacts.length===0){
      const data={username:author,roomId:room,image:Sender.image}
      await User.findOneAndUpdate({_id:Reciever._id},{ $push: { contacts: data } })
    }
    Reciever.contacts.map(async (i)=>{
      if(i.username!==author){
        const data={username:author,roomId:room,image:Sender.image}
        await User.findOneAndUpdate({_id:Reciever._id},{ $push: { contacts: data } })
      }
    })
    const data={author:author,time:time,message:message}
    if(ChatRoom){
      await Room.findOneAndUpdate({room:room},{ $push: { messages: data } })
    }
    else{
      const newRoom=await new Room({room:room,messages:[data]})
      await newRoom.save()
    }
    res.status(200).send("message sent")
  } catch (error) {
    // console.log(error)
    res.status(200).send("message not sent")
    
  }
})
app.get("/messages/:roomId",async (req,res)=>{
  const {roomId}=req.params
  try {
    const messages=await Room.findOne({room:roomId})
    if(messages!==null){
      res.json(messages.messages)
    }
    res.json([])
  } catch (error) {
    // console.log(error)
    res.status(500).send("cannot find messages")
  }
})
app.get("/messages",async (req,res)=>{
  const {room,username}=req.query;
  try {
    const user=await User.findOne({username:username});
    const messages=await Room.findOne({room:room})
    if(messages.messages){
      const message=messages.messages[messages.messages.length-1]
      res.json(message)
    }
  } catch (error) {
     console.log(error)
    res.status(500).send("cannot find messages")
  }
})


















app.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).send(`No user exists with username ${username}`);
  }
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const token = jwt.sign({ userId: user._id ,user:user}, "XYZABC3366", {
      expiresIn: "7d",
    });
    res.status(200).json(token);
  } else {
    res.status(401).send("password do not matches");
  }
});

app.post("/signup", async (req, res) => {
  const { password, username } = req.body;

  //1) check if user already exist
  const user = await User.findOne({ username });
  if (user) {
    return res
      .status(422)
      .send(`User already exists with username ${username}`);
  }
  //2)if not hash their password
  const hash = await bcrypt.hash(password, 10);
  //3))create user
  const newuser = await new User({
    username: username,
    password: hash,
    image:req.body.image
  }).save();
  console.log(newuser)

  //4)create token for the new user
  const token = jwt.sign({ userId: newuser._id ,user:newuser}, "XYZABC3366", {
    expiresIn: "7d",
  });
  res.status(201).json(token);
  //5)send back token
});
