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
  WithFieldValue,
  DocumentData,
  getDoc,
  updateDoc,
} from "firebase/firestore";

abstract class BaseService {
  static db = getFirestore(app);
  static collection = "";

  static async findAll(fn: (dataArray: any[]) => void) {
    const q = query(collection(this.db, this.collection));
    onSnapshot(q, (querySnapshot) => {
      const dataArray: any[] = [];
      querySnapshot.forEach((doc) => {
        dataArray.push({ ...doc.data(), id: doc.id });
      });
      fn(dataArray);
    });
  }

  static async findOne(id: string, fn: (data: any) => void) {
    onSnapshot(doc(this.db, this.collection, id), (doc) => {
      if (!doc.data()) fn(null);
      fn({ ...doc.data(), id: doc.id });
    });
  }

  static async findOneOnce(id: string, fn: (data: any) => void) {
    const docRef = doc(this.db, this.collection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      fn({ ...docSnap.data(), id: docSnap.id });
    } else {
      fn(null);
    }
  }

  static async addOne(input: any) {
    await addDoc(collection(this.db, this.collection), input);
  }

  static async setOne<T>(id: string, input: T) {
    await setDoc(
      doc(this.db, this.collection, id),
      input as WithFieldValue<DocumentData>
    );
  }

  static async updateOne<T>(id: string, input: T) {
    const docRef = doc(this.db, this.collection, id);
    await updateDoc(docRef, input as WithFieldValue<DocumentData>);
  }

  static async deleteOne(id: string, fn?: () => void) {
    await deleteDoc(doc(this.db, this.collection, id));
    if (fn) fn();
  }
}

export default BaseService;
