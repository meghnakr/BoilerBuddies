import React from 'react';
import ReactDOM from 'react-dom';

export default class ConfirmationBox extends React.Component {
  render() {
    const { message, onYes, onNo } = this.props;
    return (
      <div className="confirmation-box">
        <p className="message">{message}</p>
        <button className="yes-button" onClick={onYes}>Yes</button>
        <button className="no-button" onClick={onNo}>No</button>
      </div>
    );
  }
}

// Example usage
function App() {
  const handleYes = () => {
    console.log('Yes clicked');
  };
  
  const handleNo = () => {
    console.log('No clicked');
  };
  
  return (
    <div>
      <h1>Confirmation Box Example</h1>
      <ConfirmationBox message="Are you sure you want to delete this item?" onYes={handleYes} onNo={handleNo} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

