import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  MdEmail,
  MdOutlinePassword,
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config.ts";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isOpen, setisOpen] = useState(false);

  const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);

  const loginWithEmailAndPassword = async (data: any) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        if (user) {
          navigate("/app/home");
          sessionStorage.setItem("user", JSON.stringify(user));
        } else {
          setisOpen(true);
        }
        // ...
      })
      .catch((error) => {
        setisOpen(true);
        console.log(error);
      });
  };

  return (
    <main className="h-full">
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto sm:h-16 w-auto h-14"
            src={
              "https://www.utsvirtual.edu.co/sitio/wp-content/uploads/2018/08/uts-virtal-logo-nuevo.png"
            }
            alt="Logo UTS virtual"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Iniciar sesión en su cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit(loginWithEmailAndPassword)}
            className="space-y-6"
            method="POST"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <Input
                  type="email"
                  variant="bordered"
                  placeholder="example@correo.uts.edu.co"
                  className="max-w"
                  size="lg"
                  startContent={
                    <MdEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  {...register("email")}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <Input
                  {...register("password")}
                  variant="bordered"
                  size="lg"
                  placeholder="dy*f45BGS_S"
                  startContent={
                    <MdOutlinePassword className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisiblePassword ? (
                        <MdOutlineVisibilityOff className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <MdOutlineVisibility className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisiblePassword ? "text" : "password"}
                  className="max-w "
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                color="primary"
                className="w-full"
                variant="solid"
              >
                Ingresar
              </Button>

              {/* <Button
                onClick={loginWithMicrosoft}
                color="default"
                className="w-full"
                variant="bordered"
              >
                <PiMicrosoftOutlookLogo className="text-2xl text-default-400 pointer-events-none" />
                Ingresar con el correo institucional
              </Button> */}
            </div>
          </form>
        </div>
      </div>

      <Modal backdrop="opaque" isOpen={isOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Validación de credenciales
              </ModalHeader>
              <Divider />
              <ModalBody>
                <p>
                  Las credenciales ingresadas son incorrectas. Valida tus datos
                  e intentalo nuevamente.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => setisOpen(false)}
                  color="primary"
                  onPress={onClose}
                >
                  Ok
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </main>
  );
};

export default Login;
