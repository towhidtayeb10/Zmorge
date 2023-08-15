// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get } from "firebase/database"; // Import database-related functions
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMta-2bPX8UZDVmy0Y0rzC99FmCfbiaws",
  authDomain: "zmorge-notfall-op.firebaseapp.com",
  projectId: "zmorge-notfall-op",
  storageBucket: "zmorge-notfall-op.appspot.com",
  messagingSenderId: "823369623171",
  appId: "1:823369623171:web:7eddfdf19a7a4d3bbe9db6",
  measurementId: "G-HNP1SLGWGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase(app); // Initialize the database

// Save data to the database
const databaseRef = ref(database, "dataPath");
set(databaseRef, "Hello, Firebase!");

// Retrieve data from the database
get(databaseRef).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
});