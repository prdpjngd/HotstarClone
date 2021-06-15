import firebase from "firebase";

import "firebase/auth"; //auth
import "firebase/database"; //database can like sql , mongodb //firebase is no sql type
import "firebase/storage"; //storage ///images , videos , photos , pdf , fonts


// Create Web App in firebase and copy paste Information here ...
const firebaseConfig = {
  apiKey: "--app-key--",
  authDomain: "app-name.firebaseapp.com",
  databaseURL: "https://app-name.firebaseio.com",
  projectId: "app-project-name",
  storageBucket: "app-project-name.appspot.com",
  messagingSenderId: "2345678900",
  appId: "1:1234567890:web:12w3e4r5t6y7u8i",
  measurementId: "G-WERFTGYHUJIK"
};

//initialize firebase and react application
firebase.initializeApp(firebaseConfig);

export default firebase;
