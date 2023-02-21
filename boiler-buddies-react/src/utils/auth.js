import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";

/* ALL authentication handled here */
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


export function addNewUser(email, password) {
    // check if no email or password
    if (!email || !password) {
        return;     // pop up error message/alert here
    }      
    
    createUserWithEmailAndPassword(auth, email, password)       // calling a function that already exists in firebase
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
    });
}
