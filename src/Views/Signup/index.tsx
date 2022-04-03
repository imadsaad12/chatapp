import { Drawer, Typography, Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { api } from "../../constants/api";
import { Login } from "../../constants/typescript";
const useStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "9%",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "400px",
    height: "400px",
    backgroundColor: "#e0f4f2",
    borderRadius: "10px",
  },
  title: {
    color: "#00a389",
    fontFamily: "PT Sans",
    marginBottom: "25px",
    fontSize: "25px",
    fontWeight: "bold",
  },
  input: {
    width: "250px",
    textAlign: "center",
    height: "25px",
    outline: "none",
    border: "none",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  btn: {
    background: "#00a389",
    color: "white",
    width: "250px",
    height: "25px",
    borderRadius: "10px",
    marginTop: "15px",
  },
});
const Index = () => {
  const classes = useStyle();
  const [values, setValues] = useState<Login>({} as Login);
  const [image, setImage] = useState("");
  const navigate=useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(name==="image"){
      setImage(value)
    }
    else{
      setValues({ ...values, [name]: value });
    }
  };
  const handleSubmit=()=>{
      axios.post(`${api}/signup`,{...values,image:image})
      .then(res=>{
          const cookie=new Cookies();
          cookie.set("chattoken",res.data)
        navigate({pathname:"/home"})
      })
      .catch(err=>console.log(err))
  }
  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <Typography className={classes.title}>Sign up</Typography>
        <input
          className={classes.input}
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          className={classes.input}
          placeholder="password"
          name="password"
          type={"password"}

          onChange={handleChange}
        />
        <input
          className={classes.input}
          placeholder="image URL"
          name="image"
          onChange={handleChange}
        />
        <Button variant="contained" className={classes.btn} onClick={handleSubmit}>
          Create
        </Button>
      </div>
    </div>
  );
};

export default Index;
