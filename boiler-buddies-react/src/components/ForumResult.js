import React from 'react';
import PropTypes from 'prop-types';

export default class ForumResult extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        description: PropTypes.string
    }

    constructor(props) {
        super(props);
        
        this.state = {
            name: this.props.name,
            description: this.props.description
        };
    }

    render() {
        const {
            state: {
                name,
                description
            }
        } = this;

        return (
            <div className="forum-header">
            <div className='forum-info'>
                <h2>{name}</h2>
                <h6>{description}</h6>
            </div>            
            </div>
        )
    }

}