import React from 'react';
import PropTypes from 'prop-types';
import logo from "../assets/logo_vector.png";
import {getusertoken} from "../utils/auth";


export default class ForumResult extends React.Component {

    static propTypes = {
        forumId: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string,
        big_image: PropTypes.string
    }

    constructor(props) {
        super(props);
        
        this.state = {
            forumId: this.props.forumId,
            name: this.props.name,
            description: this.props.description,
            big_image: this.props.big_image
        };
    }

    async handleClick() {
        if (this.state.subscribe) {
            return;
        }

        console.log("CURRENT USER TOKEN: ", await getusertoken());

        var token = await getusertoken()
        var forumId = this.state.forumId
        var subscribeURL = "http://54.200.193.22:3000/subscribeForum/?"
        subscribeURL += "token=" + token + "&forumId=" + forumId
        console.log(subscribeURL)
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", subscribeURL, false); // false for synchronous request
        this.setState({subscribe: true})
        xmlHttp.send(null);
        var result = xmlHttp.responseText
        console.log(result)
    }

    render() {
        const {
            state: {
                forumId,
                name,
                description,
                big_image
            }
        } = this;

        var forumPageLink = "/forum/" + forumId

        return (
            <div className="forum-header" align = "left">
            <div className="profile-picture">
            <div className="profile-photo-circle">
            <div className="upload-icon">
              <i
                className="fa fa-user"
                style={{
                  fontSize: "9vmin",
                }}
              ></i>
            </div>
            {this.img !== "" ? <img src={big_image} alt=""/> : <></>}
          </div>
        </div>
            <div className='forum-info'>
                <h2 align="left"><a href={forumPageLink}>{name}</a></h2>
                <h6 align="left">{description}</h6>
            </div>
            <div className="subscribe-button">
                    <button
                        className={this.state.subscribe
                            ? "default-btn-white"
                            : "default-btn"
}
                        style={{
                            fontWeight: "normal",
                            textTransform: "capitalize",
                            border: "1px solid #88BBF6"
                        }}
                        onClick={this
                            .handleClick
                            .bind(this)}>
                        {
                            this.state.subscribe
                                ? "Subscribed"
                                : "Subscribe"
                        }
                    </button>
                </div>
            </div>
        )
    }

}