import { Drawer, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import LeftSection from "../../Components/Home/LeftSection/index";
import MiddleSection from "../../Components/Home/MiddleSection/index";
import io from "socket.io-client";

const socketIO = io("http://localhost:4000/")
const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  drawer: {
    width: "30%",
  },
});
const Index = () => {
  const classes = useStyle();
  const [room,setRoom]=useState("")
  const [to,setTo]=useState("")
  const [socket,setSocket]=useState<any>(socketIO)
  const updateState=(roomId:string,to:string)=>{
    setRoom(roomId)
    setTo(to)
  }
  return (
    <div className={classes.root}>
      <div style={{ width: "30%" }}>
        <Drawer
          anchor="left"
          variant="permanent"
          classes={{ paper: classes.drawer }}
        >
          <LeftSection updateState={updateState} socket={socket}/>
        </Drawer>
      </div>
      <div style={{ width: "70%" }}>
      <MiddleSection room={room} to={to} socket={socket}/>
      </div>
    </div>
  );
};

export default Index;
