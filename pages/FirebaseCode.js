import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAfcKPJBor-SiEAQ3LmPKgxdbDxnxmL-lg",
  authDomain: "next-12783.firebaseapp.com",
  projectId: "next-12783",
  storageBucket: "next-12783.appspot.com",
  messagingSenderId: "979951276015",
  appId: "1:979951276015:web:43d81d3f93fc912229301a",
};
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);
export { storage };
