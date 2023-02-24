import app from "./config";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import firebase from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

class AuthService {
  static login() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  static logout() {
    auth.signOut();
  }

  static getUser(fn: (user: firebase.User | { displayName: string }) => void) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        fn(user);
      } else {
        fn({ displayName: "" });
      }
    });
  }
}

export default AuthService;
