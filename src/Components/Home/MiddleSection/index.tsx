import { Drawer, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Header from "./Header/index";
import Messages from "./Messages/index";
import InputBox from "./InputBox/index";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import io from "socket.io-client";
import jwt_decode from "jwt-decode";
import { User } from "../../../constants/typescript";
import axios from "axios";
import { api } from "../../../constants/api";

const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ecf0f4",
    height: window.innerHeight - 1,
    position: "relative",
  },
  hr: {
    width: "100%",
    color: "#f4f4f4",
    marginTop: "15px",
  },
});
type Props = {
  room: string;
  to: string;
  socket:any
};
type MessageData = {
  room: string;
  author: string;
  message: string;
  time: string;
  to: string;
};
const Index = ({ room, to ,socket}: Props) => {
  const classes = useStyle();
  const [list, setList] = useState<MessageData[]>([]);
  const cookie = new Cookies();
  const token = cookie.get("chattoken");
  const decoded: any = jwt_decode(token);
  const { username }: User = decoded.user;

  const sendMessge = async (message: string) => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: username,
        message: message,
        to: to,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
       socket.emit("send-message", messageData);
      axios
        .post(`${api}/messages`, messageData)
        .then((res) => {
          setList((prev) => [...prev, messageData]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(()=>{
    console.log("room changed")
    if(room!==""){
      axios.get(`${api}/messages/${room}`).
      then((res) => {
        setList(prev=>[...prev,...res.data]);
      })
      .catch(err=>{console.log(err)})
    }
  },[room])
  
  useEffect(() => {
    console.log("recieve message")
    socket.on("recive-message", (data:any) => {
      console.log("Recive message")
      setList((prev) => [...prev, data]);
    });
  }, [socket]);
  return (
    <div className={classes.root}>
      <Header />
      <Divider light className={classes.hr} />
      <Messages room={room} messages={list} />
      <InputBox sendMessage={sendMessge} />
    </div>
  );
};

export default Index;
