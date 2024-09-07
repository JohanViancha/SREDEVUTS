import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
} from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { IoExit } from "react-icons/io5";
import { Link as LinkWouter } from "wouter";
import { User } from "@nextui-org/user";
import { Tooltip } from "@nextui-org/tooltip";

import { useState } from "react";
import { navigate } from "wouter/use-browser-location";

const Menu = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    {
      label: "Iniciar proceso",
      path: "/start-process",
    },
    {
      label: "Evaluaciones",
      path: "/manage",
    },
    {
      label: "Usuarios",
      path: "/users",
    },
  ];

  const closeSesion = () => {
    sessionStorage.clear()
    navigate("/login");

  }

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
            <LinkWouter
              className="link"
              to={item.path}
              state={{ animate: true }}
            >
              {item.label}
            </LinkWouter>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex">
          <Link href="#">{user.displayName}</Link>
        </NavbarItem>
        <NavbarItem>
          <Tooltip content="Cerrar sesión" color="primary">
            <Button onClick={closeSesion} as={Link} color="primary" href="#" variant="flat">
              <IoExit className="text-2xl" />
            </Button>
          </Tooltip>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <LinkWouter className="w-full" to={item.path}>
              {item.label}
            </LinkWouter>
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
