import React from 'react';
import PropTypes from 'prop-types';
import logo from "../assets/logo_vector.png";

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
            {this.img !== "" ? <img src={big_image} alt={logo} /> : <></>}
          </div>
        </div>
            <div className='forum-info'>
                <h2 align="left"><a href={forumPageLink}>{name}</a></h2>
                <h6 align="left">{description}</h6>
            </div>
            </div>
        )
    }

}