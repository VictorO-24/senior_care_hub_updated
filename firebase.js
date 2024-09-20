// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHoHxvrc9gXq_4wElhP1CxXaGPAyUgtUY",
  authDomain: "senior-care-hub.firebaseapp.com",
  projectId: "senior-care-hub",
  storageBucket: "senior-care-hub.appspot.com",
  messagingSenderId: "988369459656",
  appId: "1:988369459656:web:9a4a8e1a480971ae6a88fd",
  measurementId: "G-WFM2QFZER4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);