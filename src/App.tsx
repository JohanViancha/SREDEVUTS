import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Template from "./components/Template";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UploadEvaluations from "./pages/UploadEvaluations";
import ManageEvaluation from "./pages/ManageEvaluation";

const router = createBrowserRouter([
  {
    path:'/login',
    Component: Login
  },
  {
    id: "root",
    path: "app/",
    Component: Template,
    children: [
      {
        path: "home",
        Component: Home,
      },
      {
        path: "start-process",
        Component: UploadEvaluations,
      },
      {
        path: "manage",
        Component: ManageEvaluation,
      },
    ],
  },
  {path: '*' , Component: Login}
]);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = !sessionStorage.getItem("user");
    if (user) {
      console.log(isAuthenticated);
      setIsAuthenticated(user);
    }
  });
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

export default App;
