const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    contacts:[
        {username:String,roomId:String,image:String}
    ],
    image:{
        type:String
    },
    status:{
        type:String
    }
})
const User=mongoose.model("Users",userSchema);
module.exports=User