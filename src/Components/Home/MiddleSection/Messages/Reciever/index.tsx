import { Drawer, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdffff",
    marginLeft: "10px",
    height: "fit-content",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
    borderTopRightRadius: "20px",
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
      marginLeft:"80%"
  }
});
const Index = ({time,message,author}:{time:string,message:string,author:string}) => {
  const classes = useStyle();
  return (
    <div style={{marginTop:"10px"}}>
        <Typography className={classes.time}>{author},{time}</Typography>
        <div  className={classes.root}>
      <Typography className={classes.title}>
      {message}
      </Typography>
        </div>
    </div>
  );
};

export default Index;
