import { Drawer, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Sender from "./Sender/index"
import Revciver from "./Reciever/index"
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import { User } from '../../../../constants/typescript';

const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection:"column",
    height:"600px",
    overflow:"auto",
    marginBottom:"150px"
  },
  senderContainer: {
    display: "flex",
    justifyContent:"flex-end",
  },
  recieverContainer: {
    display: "flex",
  },
});
type Props={
  room:string,
  messages:MessageData[]
}
type MessageData={
  room:string,
  author:string,
  message:string,
  time:string
}

const Index = ({room,messages}:Props) => {
  const classes = useStyle();
  const cookie=new Cookies();
  const token=cookie.get("chattoken");
  const decoded:any=jwt_decode(token);
  const {username}:User=decoded.user
  return (
    <div className={classes.root}>
      {messages.map(i=>{
        return(
          <>
          {i.author===username? 
          <div className={classes.senderContainer}>
          <Sender time={i.time} message={i.message} />
          </div>:
           <div className={classes.recieverContainer}>
           <Revciver time={i.time} message={i.message} author={i.author} />
           </div>
        }
          </>
        )
      }) }
       
    </div>
  );
};

export default Index;
