import firebase from "firebase";

var config = {
  apiKey: "AIzaSyAVsoz7uh3FUOc4_Ogg9qx9gL6i5N5yyB0",
  authDomain: "concheck-f917a.firebaseapp.com",
  databaseURL: "https://concheck-f917a.firebaseio.com",
  projectId: "concheck-f917a",
  storageBucket: "",
  messagingSenderId: "715489126462"
};
firebase.initializeApp(config);

export default firebase;
