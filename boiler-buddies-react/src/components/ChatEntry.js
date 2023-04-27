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
    render() {
        const {name, chatId, chatType, img, lastActive, openChat} = this
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
                    
                </div>
            </div>
        )
    }
}