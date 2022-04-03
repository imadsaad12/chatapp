import { Avatar, Button, Drawer, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { LeftSection } from "../../../../constants/typescript";
const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    marginTop: "15px",
    width: "100px",
    height: "100px",
  },
  imageConatiner: {
    position: "relative",
  },
  dot: {
    position: "absolute",
    width: "10px",
    height: "10px",
    top: 95,
    left: 80,
    borderRadius: "50px",
    backgroundColor: "#1ebd9f",
  },
  title: {
    color: "#1f2734",
    textAlign: "center",
    fontFamily: "PT Sans",
    marginTop: "15px",
    marginBottom: "15px",
    fontSize: "22px",
    fontWeight: "bold",
  },
  available: {
    width: "100px",
    height: "20px",
    borderRadius: "3px",
    backgroundColor: "#b8e8df",
    color: "#71b1a5",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#b8e8df",
      color: "#71b1a5",
    },
  },
  busy: {
    width: "100px",
    height: "20px",
    borderRadius: "3px",
    backgroundColor: "#ff8a91",
    color: "#ff0312",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#ff8a91",
      color: "#ff0312",
    },
  },
});

type Props = {
  values: LeftSection,
  updateValues :(obj:any)=>void,
};
const Index = ({values,updateValues}:Props) => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <div className={classes.imageConatiner}>
        <Avatar className={classes.avatar} src={values.image} />
        {values.status ==="available"? <div className={classes.dot}></div>:null }
      </div>
      <Typography className={classes.title}>{values.name}</Typography>
      {values.status ==="available"? 
      <Button className={classes.available} onClick={()=>updateValues({status:"busy"})}>available</Button>
      :
      <Button className={classes.busy} onClick={()=>updateValues({status:"available"})}>busy</Button>
       }
    </div>
  );
};

export default Index;
