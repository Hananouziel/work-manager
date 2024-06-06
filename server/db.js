const { database } = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");

const firebaseConfig = {
  apiKey: "AIzaSyAVd6A4O7hp9ooMn15cFwlzNA5P3qGTMdk",
  authDomain: "mitnadvim-25728.firebaseapp.com",
  projectId: "mitnadvim-25728",
  storageBucket: "mitnadvim-25728.appspot.com",
  messagingSenderId: "453960627271",
  appId: "1:453960627271:web:5286466a56f4629f60ed62",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = database();
module.exports = { firebaseApp, db };
