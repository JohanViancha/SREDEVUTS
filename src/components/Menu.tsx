import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { IoExit } from "react-icons/io5";
import { User } from "@nextui-org/user";
import { Tooltip } from "@nextui-org/tooltip";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Menu = ({ user }: { user: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Iniciar proceso",
      path: "start-process",
    },
    {
      label: "Evaluaciones",
      path: "manage",
    },
    {
      label: "Usuarios",
      path: "users",
    },
  ];

  const closeSesion = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="md:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">SREDEVUTS</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex gap-4" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit">SREDEVUTS</p>
        </NavbarBrand>
        <Divider orientation="vertical" />

        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            <Link className="link" to={item.path} state={{ animate: true }}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <Link to={"#"} >{user.displayName}</Link>
        </NavbarItem>
        <NavbarItem>
          <Tooltip content="Cerrar sesión" color="primary">
            <Button
              onClick={closeSesion}
              as={Link}
              color="primary"
              href="#"
              variant="flat"
            >
              <IoExit className="text-2xl" />
            </Button>
          </Tooltip>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" to={item.path}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        <Divider orientation="horizontal" />

        <NavbarContent>
          <User
            name={user.displayName}
            description="Administrador"
            avatarProps={{
              src: "https://cdn-icons-png.flaticon.com/512/6676/6676023.png",
            }}
          />
        </NavbarContent>
      </NavbarMenu>
    </Navbar>
  );
};

export default Menu;
