import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import logo from '../assets/logo_vector.png';

export default class ProfileHeader extends React.Component {
    constructor(props) {
        super(props)

        this.displayName = this.props.displayName
        this.smallImage = this.props.smallImage
    }

    render() {
        return(
        <div className="profile-header" style={{width:'80%'}}>
            <div className='profile-picture'>
                <div className='upload-icon'>
                                <i
                                    className='fa fa-user'
                                    style={{
                                        fontSize: '7vmin'
                                    }}></i>
                            </div>
                    {this.smallImage && <img src={this.smallImage} alt='img'/>}

            </div>
            <div className='profile-info'>
                <h3><b>{this.displayName}</b></h3>
            </div>
            <div className='profile-button'>
                <button
                    className={'default-btn-white'
                        }
                    style={{
                        fontWeight: 'normal',
                        textTransform: 'capitalize',
                        border: '1px solid #88BBF6',
                        marginTop: '0'
                    }}
                    >
                   Add Friend
                </button>
                {/* TODO: change button to edit if it's the user's profile */}
            </div>

        </div>
    )}

}