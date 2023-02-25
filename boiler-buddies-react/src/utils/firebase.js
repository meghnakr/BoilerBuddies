// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


/* Initialize the firebase */

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: "AIzaSyBpG9oWxS8VZGMRXDA7fieV_HLREAXqXnY",
  authDomain: "boilerbuddies-ec781.firebaseapp.com",
  projectId: "boilerbuddies-ec781",
  storageBucket: "boilerbuddies-ec781.appspot.com",
  messagingSenderId: "675053874671",
  appId: "1:675053874671:web:f5bd3b6de02d10a4589a1a",
  measurementId: "G-9L1D6C0VKZ"
};

console.log("This is the project id: ", process.env.REACT_APP_PROJECTID)

// Initialize Firebase
const app = initializeApp(firebaseConfig);       // to access app from other files
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
//const db = getFirestore(app);

export {app}
