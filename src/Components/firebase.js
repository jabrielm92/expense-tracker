import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA0weW7mhb3S7ulyywxyUMt9vDbK0hBJuc",
  authDomain: "my-expense-tracker-a331f.firebaseapp.com",
  projectId: "my-expense-tracker-a331f",
  storageBucket: "my-expense-tracker-a331f.appspot.com",
  messagingSenderId: "337631974839",
  appId: "1:337631974839:web:0b1fbbab2436332b490432",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { firebase, db };

