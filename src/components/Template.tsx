import { useEffect, useState } from "react";
import Menu from "./Menu";
import ManageEvaluation from "../pages/ManageEvaluation";
import { Route } from "wouter";
import Home from "../pages/Home";
import UploadEvaluations from "../pages/UploadEvaluations";

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
        <Route path="/start-process" component={UploadEvaluations} />
        <Route path="/home" component={Home} />
        <Route path="/manage" component={ManageEvaluation} />
      </div>
    </div>
  );
};

export default Template;
