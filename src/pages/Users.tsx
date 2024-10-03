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
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import { onValue, ref, ref as refDB, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import { FaAddressCard, FaCheck, FaUser, FaUserCheck } from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdAlternateEmail, MdEdit } from "react-icons/md";
import { db } from "../../firebase.config";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

interface User {
  id: string;
  name: string;
  email: string;
  identificationType: string;
  identification: string;
  userType: number;
  state: boolean;
  createDate: string;
}

const Users = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      name: "",
      identificationType: "",
      identification: "",
      email: "",
    },
  });

  const nameValue = watch("name");
  const emailValue = watch("email");
  const identificationValue = watch("identification");
  const identificationTypeValue = watch("identificationType");

  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [stateDialog, setStateDialog] = useState(0);
  const [bodyDialog, setBodyDialog] = useState("");
  const [titleModalUser, setTitleModal] = useState("Creación del usuario");

  const getUsers = () => {
    const starCountRef = refDB(db, "users/");
    onValue(starCountRef, (snapshot) => {
      snapshot.forEach((data) => {
        const newUser = data.val();
        const key = data.key;
        setUsers((evaluation) => [...evaluation, { ...newUser, id: key }]);
      });
    });
  };

  const updateState = (state: boolean, id: string) => {
    console.log(id, state)
    update(ref(db, "users/" + `${id}`), {
      state: state,
    }).then();
    setUsers([]);
    getUsers();
  };

  const loadUser = (user: User) => {
    setIsOpen(true);
    setIsEdit(true);
    setTitleModal("Edición del usuario");
    setValue("id", user.id);
    setValue("name", user.name);
    setValue("identification", user.identification);
    setValue("identificationType", user.identificationType);
    setValue("email", user.email);
  };

  const createUser = (user: any) => {
    setStateDialog(1);
    try {
      if (isEdit) {
        update(ref(db, "users/" + `${user.id}`), {
          email: user.email,
          identification: user.identification,
          identificationType: user.identificationType,
          name: user.name,
        }).then();
      } else {
        set(ref(db, "users/" + `${uuidv4()}`), {
          email: user.email,
          identification: user.identification,
          identificationType: user.identificationType,
          name: user.name,
          state: true,
          userType: 1,
          createDate: new Date().toLocaleString(),
        }).then();
      }

      setIsOpen(false);
      reset();
      setStateDialog(2);
      setBodyDialog("El usuario ha sido guardado exitosamente");
      setUsers([]);
      getUsers();
    } catch (error) {
      setStateDialog(0);
    }
  };

  useEffect(() => {
    setUsers([]);
    getUsers();
  }, []);

  return (
    <div className="h-100 container flex justify-center flex-col mx-auto items-center gap-6 my-6 px-44 text-center">
      <h2 className="text-xl font-bold mb-4">Administrar usuarios</h2>
      <div className="w-full flex">
        <Button onClick={() => setIsOpen(true)} type="submit" color="primary">
          Crear nuevo usuario
        </Button>
      </div>

      <Table
        aria-label="table with dynamic content"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={1}
              total={1}
              //   onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn className="bg-primary text-white text-sm">
            Nombre
          </TableColumn>
          <TableColumn className="bg-primary text-white text-sm">
            Identificación
          </TableColumn>
          <TableColumn className="bg-primary text-white text-sm">
            Tipo de identificación
          </TableColumn>
          <TableColumn className="bg-primary text-white text-sm">
            Email
          </TableColumn>
          <TableColumn className="bg-primary text-white text-sm">
            Tipo de usuario
          </TableColumn>
          <TableColumn className="bg-primary text-white text-sm">
            Fecha de creación
          </TableColumn>
          <TableColumn className="bg-primary text-white text-sm">
            Estado
          </TableColumn>
          <TableColumn className="bg-primary text-white text-sm">
            Acciones
          </TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            return (
              <TableRow key={user.id} className="text-left">
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.identification}</TableCell>
                <TableCell>
                  {user.identification === "CC"
                    ? "Cédula de Ciudadanía"
                    : user.identification === "TI"
                    ? "Tarjeta de identidad"
                    : "Cédula de Extranjería"}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.userType === 1 ? "Operativo" : "Administrador"}
                </TableCell>
                <TableCell>{user.createDate}</TableCell>
                <TableCell>
                  {user.state ? (
                    <Chip
                      className="pl-3"
                      startContent={<FaCheck size={13} />}
                      variant="flat"
                      color="success"
                    >
                      Activo
                    </Chip>
                  ) : (
                    <Chip
                      className="pl-3"
                      startContent={<IoMdClose size={13} />}
                      variant="flat"
                      color="danger"
                    >
                      Inactivo
                    </Chip>
                  )}
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    {user.state ? (
                      <Tooltip color="danger" content="Inactivar usuario">
                        <span key={`${user.id}-1`} onClick={()=> updateState(false, user.id)} className="text-lg text-danger cursor-pointer active:opacity-50">
                          <FaUserXmark />
                        </span>
                      </Tooltip>
                    ) : (
                      <Tooltip color="success" content="Activar usuario">
                        <span key={`${user.id}-2`} onClick={()=> updateState(true, user.id)} className="text-lg text-success cursor-pointer active:opacity-50">
                          <FaUserCheck />
                        </span>
                      </Tooltip>
                    )}
                    <Tooltip color="warning" content="Editar evaluación">
                      <span
                        onClick={() => loadUser(user)}
                        className="text-lg text-orange-500 cursor-pointer active:opacity-50"
                      >
                        <MdEdit />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Modal backdrop="opaque" isOpen={isOpen}>
        <ModalContent>
          <form onSubmit={handleSubmit(createUser)}>
            <ModalHeader className="flex flex-col gap-1">
              {titleModalUser}
            </ModalHeader>
            <ModalBody>
              <p className="text-sm mb-2">
                Ingrese los datos para realizar la{" "}
                {titleModalUser.toLowerCase()}
              </p>

              <Input
                label="Nombre"
                type="text"
                value={nameValue}
                endContent={
                  <FaUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                {...register("name")}
              />

              <Select
                autoFocus
                label="Tipo de identificación"
                value={identificationTypeValue}
                {...register("identificationType")}
              >
                <SelectItem key={`CC`} value={`CC`}>
                  Cédula de Ciudadanía
                </SelectItem>
                <SelectItem key={`CI`} value={`CI`}>
                  Cédula de Extranjería
                </SelectItem>

                <SelectItem key={`TI`} value={`TI`}>
                  Tarjeta de Identidad
                </SelectItem>
              </Select>

              <Input
                label="Identificación"
                type="text"
                value={identificationValue}
                endContent={
                  <FaAddressCard className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                {...register("identification")}
              />
              <Input
                label="Email"
                type="email"
                value={emailValue}
                endContent={
                  <MdAlternateEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                {...register("email")}
              />
            </ModalBody>
            <br />
            <Divider />
            <ModalFooter>
              <Button color="default" onClick={() => setValue("name", "Tetst")}>
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
              {titleModalUser}
            </ModalHeader>
            <Divider orientation="horizontal" />

            <ModalBody>
              <p>{bodyDialog}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => setStateDialog(0)}>
                Ok
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </div>
  );
};

export default Users;
