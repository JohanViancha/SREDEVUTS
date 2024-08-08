import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import {
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdEmail,
  MdOutlinePassword,
} from "react-icons/md";
import { PiMicrosoftOutlookLogo } from "react-icons/pi";
import Logo from "../assets/uts_virtal_logo.png";

const Login = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const toggleVisibility = () => setIsVisiblePassword(!isVisiblePassword);

  return (
    <main className="h-full">
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto sm:h-16 w-auto h-14"
            src={Logo}
            alt="Logo UTS virtual"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Iniciar sesión en su cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
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
              <Button color="primary" className="w-full" variant="solid">
                Ingresar
              </Button>

              <Button color="default" className="w-full" variant="bordered">
                <PiMicrosoftOutlookLogo className="text-2xl text-default-400 pointer-events-none" />
                Ingresar con el correo institucional
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
