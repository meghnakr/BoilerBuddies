import React from 'react';
import PropTypes from 'prop-types';

export default class ForumResult extends React.Component {

    static propTypes = {
        forumId: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.string
    }

    constructor(props) {
        super(props);
        
        this.state = {
            forumId: this.props.forumId,
            name: this.props.name,
            description: this.props.description
        };
    }

    render() {
        const {
            state: {
                forumId,
                name,
                description
            }
        } = this;

        var forumPageLink = "/forum/" + forumId

        return (
            <div className="forum-header">
            <div className='forum-info'>
                <h2 align="center"><a href={forumPageLink}>{name}</a></h2>
                <h6 align="center">{description}</h6>
            </div>
            </div>
        )
    }

}