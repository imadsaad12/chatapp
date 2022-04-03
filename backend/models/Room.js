const mongoose=require("mongoose");
const roomSchema=new mongoose.Schema({
    room:{
        type:String,
        required:true,
        unique:true
    },
   
    messages:[
        {
            author:String,
            message:String,
            time:String,
        }
    ],
   
})
const Room=mongoose.model("Rooms",roomSchema);
module.exports=Room