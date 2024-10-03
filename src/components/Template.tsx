import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";

const Template = () => {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    console.log(user)
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
