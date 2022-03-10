// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACds4BYnj-CWzWze8z-LtymB11bBWL1Sg",
  authDomain: "wedirect-765cd.firebaseapp.com",
  databaseURL: "https://wedirect-765cd-default-rtdb.firebaseio.com",
  projectId: "wedirect-765cd",
  storageBucket: "wedirect-765cd.appspot.com",
  messagingSenderId: "1088954474438",
  appId: "1:1088954474438:web:616d9d3bc4b0bdada05cc7",
  measurementId: "G-NH343VHE65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

import { getDatabase, ref, set } from "firebase/database";

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}