import React from 'react';
import FriendProfile from '../components/FriendProfile';

const Notifications = () => {
    return (

        <div className="page-container">
        <form className="notifs-content">
          <div className="Signin-form-content">

            <span style={{fontWeight: 'bold', fontSize: 20 }}>Friend Requests: </span>
            <p></p>
            <p>

            {/* INSERT IMPLEMENTATION FOR ADDING FRIEND REQUESTS ARRAY HERE */}
            {Array(10).fill(0).map(() => <FriendProfile/>)}
            {/* Replace Array.fill with actual array from database holding friends to user */}
            </p> 

            <p></p>
            <p></p>

            <span style={{fontWeight: 'bold', fontSize: 20 }}>Likes and Comments: </span>
            <p></p>
            {/* INSERT IMPLEMENTATION FOR ADDING OTHER NOTIFICATIONS ARRAY HERE */}



          </div>
        </form>
      </div>



    )
};

export default Notifications;