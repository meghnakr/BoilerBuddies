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

function App() {
  const handleYes = () => {
    console.log("Yes");
  };

  const handleNo = () => {
    console.log("No");
  };

  return (
    <div>
      <h1>Confirmation Box Example</h1>
      <ConfirmationBox
        message="Are you sure you want to delete this item?"
        onYes={handleYes}
        onNo={handleNo}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
