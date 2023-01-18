import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDPmwxV-mDDjCm_Goo-CC3oqaCMBshPZGM",
    authDomain: "forethinkers-cbf88.firebaseapp.com",
    projectId: "forethinkers-cbf88",
    storageBucket: "forethinkers-cbf88.appspot.com",
    messagingSenderId: "725885643059",
    appId: "1:725885643059:web:f292d471f38ccd794d3646",
    measurementId: "G-6DE0DGKX4H"
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };