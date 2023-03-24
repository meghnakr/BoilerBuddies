import { getAuth, createUserWithEmailAndPassword, signOut, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { app } from "./firebase";
import {query, getDocs, collection, where, addDoc,} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';
import { endpoint } from "../global";
import { useNavigate } from "react-router-dom";

// currentUser is referring to built-in firebase currentUser



export function sendEmail() {
    alert("Please click the link sent to your email to verify your account");
    sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      // ...
    });
}

export function sendPwEmail(email) {
    sendPasswordResetEmail(auth, email).then(() => {
        // ...
      });
}



/* ALL authentication handled here */
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
//signOut(auth);            // Use this to clear cookies

export async function getusertoken() {
    const token = await auth.currentUser.getIdToken();
    return token;
}

export  function addNewUser(email, password) {
    // check if no email or password
    if (!email || !password) {
        return;     // pop up error message/alert here
    }      
    createUserWithEmailAndPassword(auth, email, password)       // calling a function that already exists in firebase
        .then((userCredential) => {
            sendEmail();
            // Signed in 
            const user = userCredential.user;
            /*await addDoc(collection(db, "users"), {
                uid: user.uid,
                authProvider: "local",
                email,
            });*/
            // ...
            /* backend/database connection - add new user to database */
         var params = new URLSearchParams()
         user.getIdToken().then((token) => {
             params.append('token', token)
             params.append('username', email.split("@")[0])
            // params.append('display_name', '')
             //params.append('interests', '')
             //params.append('intro', '')
             //params.append('big_image', '')
             //params.append('small_image', '')
             console.log(params)
             const config = {
                 header: {
                     "Content-Type": "application/x-www-form-urlencoded"
                 }
             }
            var addUserRequestURL = endpoint + "addUser/?" + params
            console.log(addUserRequestURL)
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", addUserRequestURL, false ); // false for synchronous request
            xmlHttp.send(null);
            console.log(xmlHttp.responseText);
         })
         
         
         /* end of backend connection */

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
    });

 
}




export  function signInUser(email, password) {
    // check if no email or password
    if (!email || !password) {
        return;     // pop up error message/alert here
    }      
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
        .catch((error) => {
        alert("Not a valid email and password combination")
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}


export  async function signOutUser(navigate) {
    await(signOut(auth));
    navigate("/signin")
    
}