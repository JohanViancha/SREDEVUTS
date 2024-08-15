import { initializeApp } from "firebase/app";
import "./App.css";
import LoadFile from "./pages/LoadFiile";
import Login from "./pages/Login";
import {Image} from "@nextui-org/image";
import Logo from "./assets/uts_virtal_logo.png";

import Menu from "./components/Menu"

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
  return (
    <div className="w-screen h-screen flex flex-col items-center gap-y-60">
   <Menu />

        
   
      <Image width={400} src={Logo} />
    </div>
  );
}

export default App;
