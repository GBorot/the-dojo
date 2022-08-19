import firebase from "firebase/app"
import 'firebase/firestore' 
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDbIICmDxnPt8HwTpdmiMxnynqBIz_U2LU",
    authDomain: "thedojosite-74009.firebaseapp.com",
    projectId: "thedojosite-74009",
    storageBucket: "thedojosite-74009.appspot.com",
    messagingSenderId: "192755225308",
    appId: "1:192755225308:web:0b6b5faa2dd061eba29a19"
};

// INITIALISE FIREBASE
firebase.initializeApp(firebaseConfig)

// INITIALISE SERVICES
const projectFirestore = firebase.firestore()
const projectAuth      = firebase.auth()

// TIMESTAMP
const timestamp        = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }