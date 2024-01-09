// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBB1o1UH1_xZGXw30bhmplaurcEYlLZZFw",
    authDomain: "mealstogo-df673.firebaseapp.com",
    databaseURL: "https://mealstogo-df673-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mealstogo-df673",
    storageBucket: "mealstogo-df673.appspot.com",
    messagingSenderId: "598052007473",
    appId: "1:598052007473:web:8038e859365b5a25ebef10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const imgDB = getStorage(app);
const realtimeDB = getDatabase(app);

export { db, imgDB, realtimeDB };