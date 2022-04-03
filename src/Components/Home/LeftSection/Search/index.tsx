import { Avatar, Button, Drawer, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SearchIcon from '@material-ui/icons/Search';
const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-between",
    backgroundColor:"#f0f2f4",
    width:"90%",
    height:"30px",
    marginTop:"20px",
    borderRadius:"10px"
  },
  textfield:{
      backgroundColor:"transparent",
      outline:"none",
      border:"none",
      marginLeft:"10px",
      "&::placeholder":{
          color:"lightgray"
      }
  },
  searchicon:{
      color:"#c1c5c8",
      marginTop:"2px",
      marginRight:"10px"
  }
});
const Index = () => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
        <input type="string" placeholder="search" className={classes.textfield}/>
        <SearchIcon className={classes.searchicon}/>
    </div>
  );
};

export default Index;
