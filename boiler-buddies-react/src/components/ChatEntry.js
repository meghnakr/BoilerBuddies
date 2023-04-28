import React from "react";

export default class ChatEntry extends React.Component {
    constructor(props) {
        super(props)

        this.chatId = this.props.chatId
        this.name = this.props.name
        this.chatType = this.props.chatType
        this.img = this.props.img
        this.lastActive = this.props.lastActive
    }

    openChat = () => {
        this.props.navigate(`/chat/${this.chatId}/${this.chatType}`)
    }

    timeDifference = (current, previous) => {
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;

        var elapsed = current - previous;

        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + ' seconds ago';
        } else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        } else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        } else if (elapsed < msPerMonth) {
            var diff = Math.round(elapsed / msPerDay)
            if (diff === 1) {
                return '1 day ago';
            }
            return diff + ' days ago';
        } else {
            return previous.toDateString();
        }
    }


    render() {
        const {name, chatId, chatType, img, lastActive, openChat, timeDifference} = this
        return (
            <div className='chat-entry' onClick={openChat}>
                <div className="chat-photo">
                    <div className="chat-photo-circle">
                        <div className="upload-icon" >
                            <i
                                className="fa fa-comments"
                                style={{
                                    fontSize: "5vmin"
                                }}></i>
                        </div>
                        {
                            (img !== "")
                                ? <img src={img} alt="img"/>
                                : <></>
                        }
                    </div>
                </div>
                <div className="profile-info">
                    <h4>{name}</h4>
                </div>
                <div className="profile-button">
                    {timeDifference(new Date(), new Date(lastActive))}
                </div>
            </div>
        )
    }
}