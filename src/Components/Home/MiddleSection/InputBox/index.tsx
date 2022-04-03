import { Drawer, Typography, Divider, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import SendIcon from "@material-ui/icons/Send";
import { useState } from "react";
const useStyle = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30%",
    height: "80px",
    width: "100%",
    background: "transparent",
    position: "absolute",
    bottom: "10px",
  },
  title: {
    color: "black",
    fontFamily: "PT Sans",
    marginTop: "5px",
    fontSize: "15px",
  },
  container: {
    backgroundColor: "white",
    width: "90%",
    height: "50px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    width: "90%",
    backgroundColor: "transparent",
    border: "none",
    height: "100%",
    outline: "none",
    marginLeft: "10px",
  },
  btn: {
    width: "10%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#01a488",
    "&:hover": {
      backgroundColor: "#01a488",
    },
  },
});
const Index = ({ sendMessage }: { sendMessage: (message: string) => void }) => {
  const classes = useStyle();
  const [message, setMessage] = useState("");
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <input
          type="string"
          placeholder="wirte your message ..."
          className={classes.input}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button className={classes.btn} onClick={() => sendMessage(message)}>
          <SendIcon style={{ color: "white" }} />
        </Button>
      </div>
    </div>
  );
};

export default Index;
