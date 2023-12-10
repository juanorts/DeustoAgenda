// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB68gPKSFmxRlPhVlvQQIlKCfg_OShvPm4",
  authDomain: "deustoagenda.firebaseapp.com",
  projectId: "deustoagenda",
  storageBucket: "deustoagenda.appspot.com",
  messagingSenderId: "722217663874",
  appId: "1:722217663874:web:55ad746bf327345177e39b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);