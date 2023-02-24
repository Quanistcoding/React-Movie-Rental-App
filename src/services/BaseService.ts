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

  static async findAll(fn: (dataArray: any[]) => void) {
    const q = query(collection(this.db, this.collection));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const dataArray: any[] = [];
      querySnapshot.forEach((doc) => {
        dataArray.push({ ...doc.data(), id: doc.id });
      });
      fn(dataArray);
    });
  }

  static async findOne(id: string, fn: (data: any) => void) {
    const unsub = onSnapshot(doc(this.db, this.collection, id), (doc) => {
      if (!doc.data()) fn(null);
      fn({ ...doc.data(), id: doc.id });
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
