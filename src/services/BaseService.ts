import app from "./config";
import {
  getFirestore,
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

abstract class BaseService {
  static db = getFirestore(app);
  static collection = "";

  static async findAll() {
    const q = query(collection(this.db, this.collection));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users: any[] = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      console.log(users);
    });
  }

  static async findOne(id: string) {
    const unsub = onSnapshot(doc(this.db, this.collection, id), (doc) => {
      console.log("Current data: ", doc.data());
    });
  }

  static addOne(input: any) {
    const docRef = addDoc(collection(this.db, this.collection), input);
  }

  static setOne(id: string, input: any) {
    setDoc(doc(this.db, this.collection, id), input);
  }

  static deleteOne(id: string) {
    deleteDoc(doc(this.db, this.collection, id));
  }
}

export default BaseService;
