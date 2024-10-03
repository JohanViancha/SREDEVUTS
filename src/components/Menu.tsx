import {
  Button,
  Chip,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@nextui-org/react";
import { Tooltip } from "@nextui-org/tooltip";
import { User } from "@nextui-org/user";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoExit } from "react-icons/io5";
import { MdOutlinePassword } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";
import { TiArrowSortedDown } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
import { updatePassword } from "firebase/auth";

const Menu = ({ user }: { user: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [stateDialog, setStateDialog] = useState(0);
  const [boodyModal, setboodyModal] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const [isOpen, setisOpen] = useState(false);

  const menuItems = [
    {
      label: "Iniciar proceso",
      path: "start-process",
    },
    {
      label: "Evaluaciones",
      path: "manage",
    },
  ];

  if (user.email === "vianchajohan@gmail.com")
    menuItems.push({
      label: "Usuarios",
      path: "users",
    });

  const closeSesion = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const changePassword = (data: any) => {
    setStateDialog(1);
    try {
      const user = auth.currentUser;

      updatePassword(user!, data.newPassword)
        .then(() => {
          console.log("Terminó");
        })
        .catch((error) => {
          console.log(error);
        });
      setisOpen(false);
      setStateDialog(2);
      setboodyModal("La contraseña ha sido actualizada correctamente");
    } catch (error) {
      setStateDialog(0);
    }
  };

  return (
    <>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="md:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="md:hidden pr-3" justify="center">
          <NavbarBrand>
            <Link to={"/app/home"}>
              {" "}
              <p className="font-bold text-inherit">SREDEVUTS</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-4" justify="center">
          <NavbarBrand>
            <Link to={"/app/home"}>
              {" "}
              <p className="font-bold text-inherit">SREDEVUTS</p>
            </Link>
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
            <Popover key={"bottom"} placement={"bottom"} color="primary">
              <PopoverTrigger>
                <Button
                  color="primary"
                  variant="bordered"
                  className="px-8"
                  endContent={<TiArrowSortedDown />}
                >
                  {user.displayName}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div
                  className="px-1 py-2 cursor-pointer"
                  onClick={() => setisOpen(true)}
                >
                  <div className="text-small font-bold">
                    Cambio de contraseña
                  </div>
                </div>
              </PopoverContent>
            </Popover>
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
      <Modal backdrop="opaque" isOpen={isOpen}>
        <ModalContent>
          <form onSubmit={handleSubmit(changePassword)}>
            <ModalHeader className="flex flex-col gap-1">
              Cambio de contreseña
            </ModalHeader>
            <ModalBody>
              <Input
                label="Contraseña actual"
                type="password"
                endContent={
                  <MdOutlinePassword className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                {...register("lastPassword", { required: true })}
              />
              {errors["lastPassword"] && (
                <Chip size="sm" variant="light" color="danger">
                  Este campo es requerido
                </Chip>
              )}
              <Input
                label="Nueva contraseña"
                type="password"
                endContent={
                  <MdOutlinePassword className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                {...register("newPassword", { required: true })}
              />
              {errors["newPassword"] && (
                <Chip size="sm" variant="light" color="danger">
                  Este campo es requerido
                </Chip>
              )}
              <Input
                label="Confirmar contraseña"
                type="password"
                endContent={
                  <PiPasswordBold className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                {...register("confirmPassword", { required: true })}
              />
              {errors["confirmPassword"] && (
                <Chip size="sm" variant="light" color="danger">
                  Este campo es requerido
                </Chip>
              )}
            </ModalBody>
            <br />
            <Divider />
            <ModalFooter>
              <Button color="default" onClick={() => setisOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" color="primary">
                Guardar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <Modal backdrop="opaque" isOpen={stateDialog !== 0}>
        {stateDialog === 1 ? (
          <div className="flex justify-center items-center h-screen w-screen fixed z-40 bg-neutral-800 top-0 opacity-90">
            <Spinner label="Cargando..." color="primary" labelColor="primary" />
          </div>
        ) : (
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Cambio de contraseña
            </ModalHeader>
            <Divider orientation="horizontal" />

            <ModalBody>
              <p>{boodyModal}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => setStateDialog(0)}>
                Ok
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  );
};

export default Menu;
