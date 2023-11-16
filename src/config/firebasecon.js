// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUIvuBt3Rr9JmxK6HmggGs0TZ13CLXGh4",
  authDomain: "shopping-list-app-dfcb6.firebaseapp.com",
  projectId: "shopping-list-app-dfcb6",
  storageBucket: "shopping-list-app-dfcb6.appspot.com",
  messagingSenderId: "1043957072636",
  appId: "1:1043957072636:web:b59aa1e3ce59d9c68a4d79",
  measurementId: "G-N87MTMMJMX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}
