import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTwK1duk4LJIs4qwyNBBa6J6EfvwB6IRA",
  authDomain: "sredevuts.firebaseapp.com",
  projectId: "sredevuts",
  storageBucket: "sredevuts.appspot.com",
  messagingSenderId: "643364833123",
  appId: "1:643364833123:web:30c2bc58dadaaf61a87556",
  measurementId: "G-9WSB06ZF09",
  databaseURL: "https://sredevuts-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);


export { app, auth, db, storage };

