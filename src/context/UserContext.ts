import React from "react";
import firebase from "firebase/auth";
export const UserContext = React.createContext(
  {} as firebase.User | null | undefined
);
