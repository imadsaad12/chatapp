import { Button, Modal, Paper, Typography,CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import ChatItem from "./ChatItem/index";
import { useState } from "react";
import { Contact, User } from "../../../../constants/typescript";
import axios from "axios";
import { api } from "../../../../constants/api";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode"

const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    marginTop: "20px",
    marginLeft: "10px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "#969b9c",
    fontFamily: "PT Sans",
    marginTop: "5px",
    fontSize: "15px",
    fontWeight: "bold",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e4f4f0",
    width: "30px",
    height: "30px",
    borderRadius: "10px",
  },
  icon: {
    color: "#9ad4c6",
  },
  btn: {
    width: "30px",
    height: "30px",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addContact: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "400px",
    height: "400px",
    backgroundColor: "#00a389",
    borderRadius: "10px",
  },
  input: {
    width: "250px",
    textAlign: "center",
    height: "30px",
    outline: "none",
    border: "none",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  modalTitle: {
    color: "#e0f4f2",
    fontFamily: "PT Sans",
    marginBottom: "25px",
    fontSize: "25px",
    fontWeight: "bold",
  },
  modalBtn: {
    background: "#e0f4f2",
    color: "#00a389",
    width: "250px",
    height: "30px",
    borderRadius: "10px",
    marginTop: "15px",
  },
});

type Props = {
  username: string,
  contacts: Contact[],
  updateState:(room:string,to:string)=>void,
  socket:any
};
const Index = ({ username, contacts,updateState,socket }: Props) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [contact, setContact] = useState<Contact>({} as Contact);
  const [updatedContacts, setUpdatedContacts] = useState<Contact[]>(contacts);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };
  const joinroom=(room:string,to:string)=>{
    if(room!==""){
      socket.emit("join-room",room)
      updateState(room,to)
    }
  }
  useEffect(()=>{
    const cookie=new Cookies();
    const token=cookie.get("chattoken");
    const decoded:any=jwt_decode(token);
    const {username,image,contacts}:User=decoded.user
    const getContacts=()=>{
      axios.get(`${api}/users/${username}`)     
      .then(res=>{
      setUpdatedContacts(res.data)
      }) 
      .catch(err=>console.log(err))
    }
    getContacts()
  })
  const handleSubmit = () => {
    setLoading(true)
    axios
      .put(`${api}/users/${username}`, contact)
      .then((res) => {
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
      setTimeout(() => {
        setLoading(false)
      }, 1000);
  };
  return (
    <div className={classes.root}>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={classes.modal}
      >
        {loading ? 
        <CircularProgress color="secondary" />
      :  
      <div className={classes.addContact}>
      <Typography className={classes.modalTitle}>Add contact </Typography>
      <input
        className={classes.input}
        type="string"
        placeholder="username"
        name="username"
        onChange={handleChange}
      />
      <Button
        variant="contained"
        className={classes.modalBtn}
        onClick={handleSubmit}
      >
        Add
      </Button>
    </div>
      }
     
      </Modal>
      <div className={classes.header}>
        <Typography className={classes.title}> Last chats</Typography>
        <Button className={classes.btn} onClick={() => setOpen(true)}>
          <div className={classes.iconContainer}>
            <AddIcon className={classes.icon} />
          </div>
        </Button>
      </div>
      <div style={{ maxHeight: 300, overflow: "auto" }}>
        {updatedContacts.map((i,index) => {
          return(
            <div onClick={()=>i.roomId ? joinroom(i.roomId,i.username) : null}>
              <ChatItem username={i.username} image={i.image} roomId={i.roomId} key={index} _id={i._id}/>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Index;
