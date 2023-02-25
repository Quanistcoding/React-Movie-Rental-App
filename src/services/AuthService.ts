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
  static registeredCallers: string[] = [];

  static login(callback: () => void) {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        const user = result.user;

        const userData: any = {
          id: user.uid,
        };

        this.setUserOnLogin(user.uid, userData);
        callback();
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

  static getUser(callerName: string, fn: (user: any) => void) {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fn(user);

        // UserService.findOneOnce(user.uid, (user) => {
        //   fn(user);
        // });
      } else {
        fn(null);
      }
    });

    if (!this.registeredCallers.includes(callerName)) {
      this.registeredCallers.push(callerName);
    } else {
      unsubscribe();
    }
  }

  static getCurrentUser() {
    return auth.currentUser;
  }

  static setUserOnLogin(uid: string, data: any) {
    UserService.findOneOnce(uid, (user) => {
      if (!user) UserService.setOne<User>(uid, data);
    });
  }
}

export default AuthService;
