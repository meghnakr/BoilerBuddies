import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Settings(props) {
  const navigate = useNavigate();
  const handleClick = (event) => {
    navigate(event.target.value);
  }
  return (
    <>
      <div className="page-container">
        <form className="Settings-form">
          <div className="Signin-form-content">
            <span style={{ fontWeight: 'bold', fontSize: 45 }}>Settings</span>


            <div className="form 3">
              <button type="editProfile" className="settings-btn">
                Edit Profile
              </button>

              <button type="changePassword" className="settings-btn" value='/set-new-password' onClick={handleClick}>
                Change Password
              </button>

              <button type="deleteAccount" className="settings-btn">
                Delete Account
              </button>

              <button type="signOut" className="settings-btn">
                Sign Out
              </button>

            </div>

          </div>
        </form>
      </div>
    </>
  )
}