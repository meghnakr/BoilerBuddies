import React, { useState } from "react";

const ReportForm = () => {
  const functions = require("firebase-functions");
  const nodemailer = require("nodemailer");

  const gmailEmail = functions.config().gmail.email;
  const gmailPassword = functions.config().gmail.password;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
  });

  exports.sendEmail = functions.https.onCall(async (data, context) => {
    const { emailTo, subject, message } = data;

    const mailOptions = {
      from: gmailEmail,
      to: emailTo,
      subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
    };
  });

  import firebase from "firebase/app";
  import "firebase/functions";

  const sendEmail = firebase.functions().httpsCallable("sendEmail");

  sendEmail({
    emailTo: "boillerbuddiesreports@gmail.com",
    subject: "Test Email",
    message: "<p>This is a test email.</p>",
  })
    .then((result) => {
      console.log(result.data);
    })
    .catch((error) => {
      console.error(error);
    });

  const [reportReasons, setReportReasons] = useState({
    spam: false,
    inappropriate_content: false,
    abusive_behavior: false,
    other: false,
  });

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setReportReasons({ ...reportReasons, [name]: checked });
  };

  const handleSubmit = (event) => {
    sendEmail();
    event.preventDefault();
    const selectedReasons = Object.keys(reportReasons).filter(
      (reason) => reportReasons[reason]
    );
    console.log("Selected reasons: ", selectedReasons);
    // submit report data to backend API
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Report User</h3>
      <p>Select the reasons for your report:</p>
      <div>
        <label>
          <input
            type="checkbox"
            name="spam"
            checked={reportReasons.spam}
            onChange={handleChange}
          />
          Spam
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="inappropriate_content"
            checked={reportReasons.inappropriate_content}
            onChange={handleChange}
          />
          Inappropriate Content
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="abusive_behavior"
            checked={reportReasons.abusive_behavior}
            onChange={handleChange}
          />
          Abusive Behavior
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="other"
            checked={reportReasons.other}
            onChange={handleChange}
          />
          Other
        </label>
      </div>
      <button type="submit">Submit Report</button>
    </form>
  );
};

export default ReportForm;
