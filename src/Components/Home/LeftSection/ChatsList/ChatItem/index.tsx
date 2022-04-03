import { Avatar, Button, Drawer, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Contact } from "../../../../../constants/typescript";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../../../constants/api";
const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    marginTop:"20px",
    "&:hover":{
        backgroundColor:"#f6f8fa"
    },
    borderRadius:"5px",
  },
  messageContainer:{
    display: "flex",
    flexDirection: "column",
  },
  name: {
    color: "#1f2734",
    fontFamily: "PT Sans",
    fontWeight:"bold",
    marginLeft:"20px",
    fontSize:"16px",
  },
  message: {
    color: "#a0a9ad",
    fontFamily: "PT Sans",
    marginLeft:"20px",
    fontSize:"12px"
  },
  time: {
    color: "#a0a9ad",
    fontFamily: "PT Sans",
    fontSize:"12px",
    marginLeft:"45px",
  },
});


const Index = ({image,username,roomId}:Contact) => {
  const classes = useStyle();
  const [message,setMessage]=useState("");
  const [author,setAuthor]=useState("");
  const [time,setTime]=useState("");
  useEffect(()=>{
    axios.get(`${api}/messages?room=${roomId}&&username=${username}`).
    then((res) => {
       setMessage(res.data.message);
       setTime(res.data.time)
       setAuthor(res.data.author)
    })
    .catch(err=>{console.log(err)})
  })
  return (
    <div className={classes.root} >
    <Avatar style={{marginTop:"5px",marginLeft:"5px"}} src={image} />
   <div className={classes.messageContainer}>
    <Typography className={classes.name}>{username}</Typography>
    {author!==username?
    <Typography className={classes.message}>You : {message}</Typography>:
    <Typography className={classes.message}>{username} : {message}</Typography>
    }
   </div>
   <Typography className={classes.time}>{time}</Typography>
   </div>
  );
};

export default Index;
