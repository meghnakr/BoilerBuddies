import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "./firebase";
import {query, getDocs, collection, where, addDoc,} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";


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

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}


export  function signOutUser() {
    signOut(auth);
}