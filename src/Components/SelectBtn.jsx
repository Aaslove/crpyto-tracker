import React, { Children } from "react";
import { makeStyles } from "@material-ui/core";

function SelectBtn({ children, selected, onClick }) {
  const useStyles = makeStyles({
    SelectBtn: {
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
      width: "22%",
      margin: 5,
    },
  });
  const classes = useStyles();
  return (
    <span className={classes.SelectBtn} onClick={onClick}>
      {children}
    </span>
  );
}

export default SelectBtn;
