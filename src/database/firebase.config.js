// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmiQJxdwj9Xvf1Jehcm2Gsh-f44vHVMaI",
    authDomain: "chat-app-9b10e.firebaseapp.com",
    projectId: "chat-app-9b10e",
    storageBucket: "chat-app-9b10e.appspot.com",
    messagingSenderId: "1063849841034",
    appId: "1:1063849841034:web:7ef68761c5bc3b5200f873"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app)

export { db, auth };