import { initializeApp } from "firebase/app";
import { useEffect, useState } from "react";
import { Route } from "wouter";
import "./App.css";
import Template from "./components/Template";
import Login from "./pages/Login";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = !sessionStorage.getItem("user");
    if (user) {
      setIsAuthenticated(user);
    }
  });
  return (
    <>
      <Route path="/login" component={Login} />
      {isAuthenticated ? <Login /> : <Template />}
    </>
  );
}

export default App;
