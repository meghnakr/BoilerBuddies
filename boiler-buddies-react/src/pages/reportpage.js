import React, { useEffect, useState } from "react";
import { browserLocalPersistence, signOut } from "@firebase/auth";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { getFirestore } from "firebase/firestore";
import Form from "../components/Form";
import axios from "../utils/Axios";
import { useParams } from "react-router";
import useUser from "../hooks/useUser";

function ReportPage() {
  const params = useParams();
  const reporteduserstring = ""

  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);
  const [isChecked5, setIsChecked5] = useState(false);
  const [otherReason, setOtherReason] = useState("");
  const [templateParams, setTemplateParams] = useState({
    from_name: "",
    to_name: "",
    reason: "",
  });



  /* Set reporting user by using useUser to get current user */
  const reportingUser = useUser();
  const reasonString = "";


  useEffect(() => {
    let reasonString = "";
    if (isChecked1) {
      reasonString = "Spam";
    }
    if (isChecked2) {
      reasonString = "Inappropriate Content";
    }
    if (isChecked3) {
      reasonString = "This person is pretending to be someone else";
    }
    if (isChecked4) {
      reasonString = "Harassment";
    }

    if (otherReason) {
      reasonString = otherReason;
    }
    setTemplateParams({
      ...templateParams,
      reason: reasonString,
    });

  }, [isChecked1, isChecked2, isChecked3, isChecked4, otherReason]);

  const getUserToReport = () => {
    let reporteduserstring = ""

    // use params.userID to get the username of the user that we are reporting
    let getUsernameRequestURL = "http://54.200.193.22:3000/getUsernameById/?";
    getUsernameRequestURL += "user_id=" + params.userId;
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", getUsernameRequestURL, false); // false for synchronous request
    xmlHttp.send(null);
    const result = xmlHttp.responseText;
    console.log("Result", result);
    reporteduserstring = JSON.parse(result).user_id
    console.log("REPORTED USER STRING: ", reporteduserstring)


    /* Update my template params */
    setTemplateParams({
      ...templateParams, //takes current value of template params and only assign to_name, but other params are still there
      to_name: JSON.parse(result).user_id, //change this to username later
      from_name: reportingUser.username,
      reason: reasonString,
      // use useEffect to check if any of the boxes updates, and set the value to that
    });



  };

  emailjs.init('1CRGH5zvS7pt5JaSA');

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Running Submit")

    emailjs
      .send("service_nb49aza", "template_gmflo1n", templateParams)
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (err) {
          console.log("FAILED...", err);
        }
      );
  }




  useEffect(() => {
    getUserToReport();
  }, [reportingUser]); // depending on reportingUser, guarantees that it is up to date with current user's username

  console.log("template params: ", templateParams);

  return (
    <div className="page-container" style={{ justifyContent: "center" }}>
      <form className="Settings-form" style={{ justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <span style={{ fontWeight: "bold", fontSize: 40 }}>
              Report User Form
            </span>
            <p>Why would you like to report the following user? {reporteduserstring}</p>
            <form /*onSubmit={handleSubmit}*/>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={isChecked1}
                  onChange={() => setIsChecked1(!isChecked1)}
                  style={{ marginRight: "10px", width: "25px", height: "25px" }}
                />
                <span style={{ fontSize: "20px" }}>Spam</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={isChecked2}
                  onChange={() => setIsChecked2(!isChecked2)}
                  style={{ marginRight: "10px", width: "25px", height: "25px" }}
                />
                <span style={{ fontSize: "20px" }}>Inappropriate Content</span>
              </div>


              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={isChecked3}
                  onChange={() => setIsChecked3(!isChecked3)}
                  style={{ marginRight: "10px", width: "25px", height: "25px" }}
                />
                <span style={{ fontSize: "20px" }}>This person is pretending to be someone else</span>
              </div>




              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={isChecked4}
                  onChange={() => setIsChecked4(!isChecked4)}
                  style={{ marginRight: "10px", width: "25px", height: "25px" }}
                />
                <span style={{ fontSize: "20px" }}>Harassment</span>
              </div>


              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={isChecked5}
                  onChange={() => setIsChecked5(!isChecked5)}
                  style={{ marginRight: "10px", width: "25px", height: "25px" }}
                />
                <span style={{ fontSize: "20px" }}>Other</span>
                {isChecked5 && (
                  <input
                    type="text"
                    value={otherReason}
                    onChange={(event) => setOtherReason(event.target.value)}
                    style={{
                      marginLeft: "10px",
                      height: "25px",
                      width: "200px",
                    }}
                    placeholder="Please specify..."
                  />
                )}
              </div>
              <br />
              <button
                type="button"
                onClick={handleSubmit}
                style={{
                  marginTop: "20px",
                  fontSize: "20px",
                  padding: "10px 20px",
                  backgroundColor: "#88BBF6",
                  color: "white",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReportPage;
