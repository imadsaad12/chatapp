import { Drawer, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d0d3e2",
    marginRight: "10px",
    height: "fit-content",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
    borderTopLeftRadius: "20px",
    minWidth: "200px",
    maxWidth: "300px",
    padding: "10px",
  },
  title: {
    color: "black",
    fontFamily: "PT Sans",
    marginTop: "5px",
    fontSize: "15px",
  },
  time:{
      fontSize:"12px",
      marginLeft:"10px"
  }
});
const Index = ({time,message}:{time:string,message:string}) => {
  const classes = useStyle();
  return (
    <div style={{marginTop:"10px"}}>
        <Typography className={classes.time}>You,{time}</Typography>
        <div  className={classes.root}>
      <Typography className={classes.title}>
       {message}
      </Typography>
        </div>
    </div>
  );
};

export default Index;
