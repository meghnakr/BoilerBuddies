import { createContext, useState } from "react";
import { auth } from "../utils/auth";
import { onAuthStateChanged } from "@firebase/auth";

const initialUser = {
  localId: "",
  email: "",
  passwordHash: "",
  emailVerified: false,
  passwordUpdatedAt: null,
  providerUserInfo: [
    {
      providerId: "",
      federatedId: "",
      email: "",
      rawId: "",
    },
  ],
  validSince: "",
  lastLoginAt: "",
  createdAt: "",
  lastRefreshAt: "",
};

export const UserContext = createContext({ user: initialUser, isLoggedIn: false });

export function UserProvider(props) {
  const [user, setUser] = useState(initialUser);
  const [loggedIn, setLoggedIn] = useState(false);
  const value = { user, loggedIn };

    
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      setLoggedIn(true);
      setUser(user);
      console.log("USER: ", user);
      console.log("UID: ", user.uid);

      // ...
    } else {
      // User is signed out
      // ...
      setLoggedIn(false);
      setUser(initialUser);
      console.log("IN USERCONTEXT FILE:", user);
    }
  });
  


  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
