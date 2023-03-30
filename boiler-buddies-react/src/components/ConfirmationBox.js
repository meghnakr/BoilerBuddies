import React from "react";
import ReactDOM from "react-dom";

export default class ConfirmationBox extends React.Component {
  render() {
    const { message, onYes, onNo } = this.props;
    return (
      <div className="confirmation-box">
        <p className="confirmation-box-message">{message}</p>
        <div className="confirmation-buttons">
          <button className="yes-button" onClick={onYes}>
            Yes
          </button>
          <button className="no-button" onClick={onNo}>
            No
          </button>
        </div>
      </div>
    );
  }
}

