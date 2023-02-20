import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo_text.png'
import Tabs from '../components/Tabs'

export default function Settings(props) {
  return (
    <>
      <div className="Signin-form-container">
        <form className="Settings-form">
          <div className="Signin-form-content">
            <span style={{ fontWeight: 'bold', fontSize: 45 }}>Settings</span>


            <div className="form 3">
              <button type="editProfile" className="settings-btn">
                Edit Profile
              </button>

              <button type="changePassword" className="settings-btn">
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