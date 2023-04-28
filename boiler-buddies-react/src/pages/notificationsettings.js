import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser, deleteAccount } from "../utils/auth";
import { ConfirmDialog } from "primereact/confirmdialog";
import ConfirmationBox from "../components/ConfirmationBox";
import { useState, useEffect } from "react";
import axios from "../utils/Axios";
import { getusertoken } from "../utils/auth";

export default function NotificationSettings(props) {
  const [isChecked1, setIsChecked1] = useState(
    localStorage.getItem("isChecked1") === "true" || false
  );
  const [isChecked2, setIsChecked2] = useState(
    localStorage.getItem("isChecked2") === "true" || false
  );
  const [isChecked3, setIsChecked3] = useState(
    localStorage.getItem("isChecked3") === "true" || false
  );
  const [isChecked4, setIsChecked4] = useState(
    localStorage.getItem("isChecked4") === "true" || false
  );
  const [isChecked5, setIsChecked5] = useState(
    localStorage.getItem("isChecked5") === "true" || false
  );
  const [isChecked6, setIsChecked6] = useState(
    localStorage.getItem("isChecked6") === "true" || false
  );

  const [notifyOnPostLike, setNotifyOnPostLike] = useState(true);
  const [notifyOnCommentLike, setNotifyOnCommentLike] = useState(true);
  const [notifyOnPostComment, setNotifyOnPostComment] = useState(true);
  const [notifyOnCommentReply, setNotifyOnCommentReply] = useState(true);
  const [notifyOnFriendAcceptance, setNotifyOnFriendAcceptance] = useState(true);
  const [notifyOnFriendRequest, setNotifyOnFriendRequest] = useState(true);

  useEffect(() => {
    localStorage.setItem("isChecked1", isChecked1);
    localStorage.setItem("isChecked2", isChecked2);
    localStorage.setItem("isChecked3", isChecked3);
    localStorage.setItem("isChecked4", isChecked4);
    localStorage.setItem("isChecked5", isChecked5);
    localStorage.setItem("isChecked6", isChecked6);

  }, [isChecked1, isChecked2, isChecked3, isChecked4, isChecked5, isChecked6]);

  async function updateNotifs() {
    /* Make a call to updateNotifications */
    const token = await getusertoken();
    axios.get("/updateNotifications/", {
      params: {
        token: token,
        notifyOnPostLike: notifyOnPostLike,
        notifyOnCommentLike: notifyOnCommentLike,
        notifyOnPostComment: notifyOnPostComment,
        notifyOnCommentReply: notifyOnCommentReply,
        notifyOnFriendAcceptance: notifyOnFriendAcceptance,
        notifyOnFriendRequest: notifyOnFriendRequest,
      },
    });
    console.log("Notifications are updated");
  }


  /* If box is checked, set the value to FALSE */
  /* Call updateNotifs function when Save is hit */

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
              Notification Settings
            </span>
            <p>Disabled Notifications</p>
            <form /*onSubmit={handleSubmit}*/>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={isChecked1}
                  onChange={() => {
                    setIsChecked1(!isChecked1);
                    if (!isChecked1) {
                        setNotifyOnPostLike(false);
                    }
                  }}
                  style={{ marginRight: "10px", width: "25px", height: "25px" }}
                />
                <span style={{ fontSize: "20px" }}>Post Likes</span>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={isChecked2}
                  onChange={() => {
                    setIsChecked2(!isChecked2);
                    if (!isChecked2) {
                      setNotifyOnCommentLike(false);
                    }
                  }}
                  style={{ marginRight: "10px", width: "25px", height: "25px" }}
                />
                <span style={{ fontSize: "20px" }}>Comment Likes</span>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={isChecked3}
                  onChange={() => {
                    setIsChecked3(!isChecked3);
                    if (!isChecked3) {
                        setNotifyOnPostComment(false);
                    }
                  }}
                  style={{ marginRight: "10px", width: "25px", height: "25px" }}
                />
                <span style={{ fontSize: "20px" }}>Post Comments</span>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={isChecked4}
                  onChange={() => {
                    setIsChecked4(!isChecked4);
                    if (!isChecked4) {
                      setNotifyOnCommentReply(false);
                    }
                  }}
                  style={{ marginRight: "10px", width: "25px", height: "25px" }}
                />
                <span style={{ fontSize: "20px" }}>Comment Replies</span>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={isChecked5}
                  onChange={() => {
                    setIsChecked5(!isChecked5);
                    if (!isChecked5) {
                      setNotifyOnFriendAcceptance(false);
                    }
                  }}
                  style={{ marginRight: "10px", width: "25px", height: "25px" }}
                />
                <span style={{ fontSize: "20px" }}>
                  Accepted Friend Requests
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={isChecked6}
                  onChange={() => {
                    setIsChecked6(!isChecked6);
                    if (!isChecked6) {
                      setNotifyOnFriendRequest(false);
                    }
                  }}
                  style={{ marginRight: "10px", width: "25px", height: "25px" }}
                />
                <span style={{ fontSize: "20px" }}>Friend Requests</span>
              </div>

              <br />
              <button
                type="button"
                // onClick={handleSubmit}
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
                onClick={updateNotifs}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </form>
    </div>
  );
}
