import app from "./config";
import firebase, {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import UserService from "./UserService";
import { User } from "models/user";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

class AuthService {
  static login() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        const user = result.user;

        const userData: User = {
          id: user.uid,
          name: user.displayName,
          isAdmin: false,
          phone: user.phoneNumber,
          address: "",
          email: user.email,
        };
        console.log(userData);
        this.setUserOnLogin(user.uid, userData);
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

  static getUser(fn: (user: firebase.User | null | undefined) => void) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fn(user);
      } else {
        fn(user);
      }
    });
  }

  static setUserOnLogin(uid: string, data: any) {
    UserService.setOne(uid, data);
  }
}

export default AuthService;
