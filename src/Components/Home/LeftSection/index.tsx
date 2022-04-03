import { Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import { Contact, LeftSection, User } from "../../../constants/typescript";
import Profile from "../LeftSection/Profile/index";
import Search from "./Search/index"
import ChatList from "./ChatsList/index"
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import axios from "axios";
import { api } from "../../../constants/api";
const useStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  drawer: {
    width: "20%",
  },
  title: {
    color: "#1f2734",
    textAlign: "center",
    fontFamily: "PT Sans",
    marginTop: "10px",
    marginBottom: "15px",
    fontWeight:"bold"
  },
  hr: {
    width: "90%",
    color: "#f4f4f4",
  },
});
type Props={
  updateState:(room:string,to:string)=>void,
  socket:any
}

const Index = ({updateState,socket}:Props) => {
  const classes = useStyle();
  const [values,setValues]=useState<LeftSection>({
      status:"available",
      name:"",
      image:"",
      contacts:[] 
  })
  const updateValues=(obj:any)=>{
      setValues({...values,...obj})
  }
  useEffect(()=>{
    const cookie=new Cookies();
    const token=cookie.get("chattoken");
    const decoded:any=jwt_decode(token);
    const {username,image,contacts}:User=decoded.user
    const getContacts=()=>{
      axios.get(`${api}/users/${username}`)     
      .then(res=>{
        updateValues({name:username,image:image,contacts:res.data})
      }) 
      .catch(err=>console.log(err))
    }
    getContacts()
  },[])
  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Chat
      </Typography>
      <Divider light className={classes.hr} />
      <Profile values={values} updateValues={updateValues} />
      <Search />
      <ChatList username={values.name} contacts={values.contacts} updateState={updateState} socket={socket}/>
    </div>
  );
};

export default Index;
