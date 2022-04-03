import { Drawer, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "black",
    fontFamily: "PT Sans",
    marginTop: "5px",
    fontSize: "25px",
    fontWeight: "bold",
    marginLeft: "40%",
  },
});
const Index = () => {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>Messages</Typography>
    </div>
  );
};

export default Index;
