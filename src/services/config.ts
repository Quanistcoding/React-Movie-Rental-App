import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDS7ogknK8oDZIlzTjQhRXqapD4EpZdFfI",
  authDomain: "react-movie-rental-app.firebaseapp.com",
  projectId: "react-movie-rental-app",
  storageBucket: "react-movie-rental-app.appspot.com",
  messagingSenderId: "622704378766",
  appId: "1:622704378766:web:80764e27cb58f1ee379adf",
  measurementId: "G-N1M7ZPSQLN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
