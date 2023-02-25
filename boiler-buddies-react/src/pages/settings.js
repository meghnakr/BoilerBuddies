import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOutUser } from '../utils/auth';

export default function Settings(props) {
  const navigate = useNavigate();
  const handleClick = (event) => {
    navigate(event.target.value, {replace:true});
  }
  return (
    <>
      <div className="page-container">
        <form className="Settings-form">
          <div className="Signin-form-content">
            <span style={{ fontWeight: 'bold', fontSize: 45 }}>Settings</span>


            <div className="form 3">
              <button type="editProfile" className="settings-btn" value='/edit-profile' onClick={handleClick}>
                Edit Profile
              </button>

              <button type="changePassword" className="settings-btn" value='/set-new-password' onClick={handleClick}>
                Change Password
              </button>

              <button type="deleteAccount" className="settings-btn">
                Delete Account
              </button>

              <button type="button" className="settings-btn" onClick={()=>{signOutUser(navigate)}} >
                Sign Out
              </button>

            </div>

          </div>
        </form>
      </div>
    </>
  )
}