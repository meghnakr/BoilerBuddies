import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { endpoint } from "../global";

const NotifBox = ({ content }) => {
  return (
    <div
      style={{

        // width: "200px",
        // height: "100px",
        // backgroundColor: "lightblue",
        // display: "flex",
        // justifyContent: "center", // center content horizontally
        // alignItems: "center", // center content vertically
        // fontSize: "20px", // increase font size


        border: "1px solid black",
        padding: "10px",
        margin: "10px",
        borderRadius: "5px",
        display: "flex",
        fontSize: "15px",
        justifyContent: "center", // center content horizontally
        alignItems: "center", // center content vertically
      }}
    >
      <p>{content}</p>
    </div>
  );
};

export default NotifBox;
