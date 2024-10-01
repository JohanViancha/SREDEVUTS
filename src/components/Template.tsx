import { useEffect, useState } from "react";
import Menu from "./Menu";
import ManageEvaluation from "../pages/ManageEvaluation";
import { Route } from "wouter";
import Home from "../pages/Home";
import UploadEvaluations from "../pages/UploadEvaluations";
import { Outlet } from "react-router-dom";

const Template = () => {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  return (
    <div>
      <div>
        <Menu user={user} />
      </div>
      <div>
      <Outlet />
      </div>
    </div>
  );
};

export default Template;
