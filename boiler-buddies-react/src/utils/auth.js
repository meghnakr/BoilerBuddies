import { getAuth, createUserWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
import { app } from "./firebase";
import {query, getDocs, collection, where, addDoc,} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

// currentUser is referring to built-in firebase currentUser



export function sendEmail() {
    alert("Please click the link sent to your email to verify your account");
    sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      // ...
    });
}


/* ALL authentication handled here */
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
//signOut(auth);            // Use this to clear cookies

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
            console.log(user);
            /*await addDoc(collection(db, "users"), {
                uid: user.uid,
                authProvider: "local",
                email,
            });*/
            // ...
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