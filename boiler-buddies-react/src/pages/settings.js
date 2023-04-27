import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser, deleteAccount } from "../utils/auth";
import { ConfirmDialog } from "primereact/confirmdialog";
import ConfirmationBox from "../components/ConfirmationBox";
import { useState } from "react";


export default function Settings(props) {
  const navigate = useNavigate();
  const handleClick = (event) => {
    navigate(event.target.value, { replace: true });
  };

  const [showConfirmationBox, setShowConfirmationBox] = useState(false);

  function handleDeleteAccount() {
    setShowConfirmationBox(true);
    
  }

  function handleConfirmationBoxCancel() {
    setShowConfirmationBox(false);
  }

  function handleConfirmationBoxConfirm() {
    setShowConfirmationBox(false);
    deleteAccount(navigate);

  }

  return (
    <>
      <div className="page-container">
        <form className="Settings-form">
          <div className="Signin-form-content">
            <span style={{ fontWeight: "bold", fontSize: 45 }}>Settings</span>

            <div className="form 3">
              <button
                type="editProfile"
                className="settings-btn"
                value="/edit-profile"
                onClick={handleClick}
              >
                Edit Profile
              </button>

              <button
                type="changePassword"
                className="settings-btn"
                value="/set-new-password"
                onClick={handleClick}
              >
                Change Password
              </button>
 

              <button
                type="manageBlocked"
                className="settings-btn"
                value="/manage-blocked-users"
                onClick={handleClick}
              >
                Manage Blocked Users
              </button>

              <button
                type="notificationsettings"
                className="settings-btn"
                value="/notificationsettings"
                onClick={handleClick}
              >
                Notification Settings
              </button>


              <button
                type="button"
                className="settings-btn"
                onClick={() => {
                  handleDeleteAccount();
                  
                }}
              >
                Delete Account
              </button>
              {showConfirmationBox && (
                <div className="confirmation-box-container">
                <ConfirmationBox
                  message="Are you sure you want to delete your account?"
                  onNo={handleConfirmationBoxCancel}
                  onYes={handleConfirmationBoxConfirm}
                />
                </div>
              )}
              
              {/* <div className="confirmation-box">
              <ConfirmationBox  message="Are you sure you want to delete this item?" onYes={deleteAccount(navigate)} onNo={handleConfirmationBoxCancel} />
                </div> */}
              <button
                type="button"
                className="settings-btn"
                onClick={() => {
                  signOutUser(navigate);
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
