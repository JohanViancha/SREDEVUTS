import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {Divider} from "@nextui-org/react";
import { IoExit } from "react-icons/io5";
import { useState } from "react";


const Menu = () =>  {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
    isBordered
    isMenuOpen={isMenuOpen}
    onMenuOpenChange={setIsMenuOpen}
  >
    <NavbarContent className="sm:hidden" justify="start">
      <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
    </NavbarContent>

    <NavbarContent className="sm:hidden pr-3" justify="center">
      <NavbarBrand>
        <p className="font-bold text-inherit">SREDEVUTS</p>
      </NavbarBrand>
    </NavbarContent>
   
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarBrand>
        <p className="font-bold text-inherit">SREDEVUTS</p>
      </NavbarBrand>
      <Divider orientation="vertical" />

      <NavbarItem>
        <Link color="foreground" href="#">
          Iniciar proceso
        </Link>
      </NavbarItem>
      <NavbarItem isActive>
        <Link href="#" aria-current="page">
          Administración de evaluaciones
        </Link>
      </NavbarItem>
    </NavbarContent>

    <NavbarContent justify="end">
      <NavbarItem className="hidden lg:flex">
        <Link href="#">Johan Ferney Viancha Abril</Link>
      </NavbarItem>
      <NavbarItem>
        <Button as={Link} color="primary" href="#" variant="flat">
        <IoExit className="text-2xl"/>
        </Button>
      </NavbarItem>
    </NavbarContent>

    <NavbarMenu>
      {menuItems.map((item, index) => (
        <NavbarMenuItem key={`${item}-${index}`}>
          <Link
            className="w-full"
            color={
              index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
            }
            href="#"
            size="lg"
          >
            {item}
          </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  </Navbar>
  )
}


export default Menu