import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
/* basically FriendProfile without the functionalities */
export default class ProfileHeader extends React.Component {
    static propTypes = {
        username: PropTypes.string,
        displayName: PropTypes.string,
        interestTags: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.token = this.props.token
        this.username = this.props.username;
        this.displayName = this.props.displayName;
        this.interestTags = this.props.interestTags;
        this.img = this.props.img;
        this.userId = this.props.userId; //user_id property
        this.forChat = this.props.forChat;
        this.chatId = this.props.chatId
        this.state = {
            sendRequest: this.props.sendRequest,
            blockUser: this.props.blockUser,
            isAdmin: this.props.isAdmin,
            open: false
        };
    }

    handleOpen = () => {
        this.setState({ open: !this.state.open });
      };

    removeMember = () => {
        var params = new URLSearchParams();
        params.append("token", this.token)
        params.append("otherId", this.userId)
        params.append('groupChatId', this.chatId)
        var removeGroupChatUserRequest = endpoint + "removeGroupChatUser/?" + params
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", removeGroupChatUserRequest, true); // false for synchronous request
        xmlHttp.onerror = (e) => {
            console.error(xmlHttp.statusText)
        }
        xmlHttp.send(null);
    }

    makeAdmin = () => {
        var params = new URLSearchParams();
        params.append("token", this.token)
        params.append("otherId", this.userId)
        params.append('groupChatId', this.chatId)
        var setGroupChatAdminRequest = endpoint + "setGroupChatAdmin/?" + params
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", setGroupChatAdminRequest, true); // false for synchronous request
        xmlHttp.onerror = (e) => {
            console.error(xmlHttp.statusText)
        }
        xmlHttp.send(null);

    }

    render() {
        return (
            <div className="profile-header">
                <div className="profile-picture">
                    <div className="profile-photo-circle">
                        <div className="upload-icon">
                            <i
                                className="fa fa-user"
                                style={{
                                    fontSize: "9vmin"
                                }}></i>
                        </div>
                        {
                            this.img !== ""
                                ? <img src={this.img} alt="img"/>
                                : <></>
                        }
                    </div>
                </div>
                <div className="profile-info">
                    <h2>{this.displayName}</h2>
                    <h6
                        style={{
                            fontWeight: "normal"
                        }}>{this.username}</h6>
                    {
                        this.forChat
                            ? <h6
                                    style={{
                                        fontWeight: "bold"
                                    }}>{
                                        this.props.isAdmin
                                            ? "Admin"
                                            : ""
                                    }</h6>
                            : ''
                    }
                </div>
                <div
                    className="profile-button"
                    style={{
                        width: '30%', float: 'right'
                    }}>
                    {
                        this.forChat
                            ? <div className="dropdown" style={{float:'right'}}>
                                    <button
                                        className="no-outline-btn" 
                                        onClick={this.handleOpen}>
                                        <i className="fa fa-ellipsis-h" style={{fontSize: '4vmin'}}></i>
                                    </button>
                                    {this.state.open ? (
                                                <div className="dropdown-content" style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                                                }}>
                                                    <ul>
                                                        <li> <button className="dropdown-link" style={{ paddingLeft: '2vmin', paddingRight: '2vmin'}}
                                                                    onClick={() => { this.setState({open: false});}}>
                                                                Remove
                                                            </button>
                                                        </li>
                                                        <li> <button className="dropdown-link" style={{ paddingLeft: '2vmin', paddingRight: '2vmin', whiteSpace: 'nowrap'}}
                                                                    onClick={() => { this.setState({open: false});}}>
                                                                Make Admin
                                                            </button>
                                                        </li>
                                                                
                                                    </ul>
                                                </div>
                                            )
                                            : null
                                    }
                                </div>
                            : this.props.currentUser !== this.username
                                ? (
                                    <button
                                        className="default-btn"
                                        style={{
                                            fontWeight: "normal",
                                            textTransform: "capitalize",
                                            border: "1px solid #88BBF6"
                                        }}>
                                        <Link
                                            to={`/user/${this.userId}`}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'white'
                                            }}>View Profile</Link>
                                    </button>
                                )
                                : (<></>)
                    }

                </div>
            </div>
        );
    }
}
