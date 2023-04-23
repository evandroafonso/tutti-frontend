import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCetfSN_2-xkOrnkE4ZpfkJ8csPL1wm3Hc",
    authDomain: "reactapp-1cd63.firebaseapp.com",
    projectId: "reactapp-1cd63",
    storageBucket: "reactapp-1cd63.appspot.com",
    messagingSenderId: "89715470380",
    appId: "1:89715470380:web:4edef438f11f0dbb02e189"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export default firebase;