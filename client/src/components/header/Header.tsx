import { useContext } from "react";
import { Button } from "../Button";
import { userContext } from "../../../context/UserContext";

export const Header = () => {
  const { logout } = useContext(userContext)!;
  return (
    <>
      <header className="bg-teal-400 w-full">
        <nav className="flex justify-between w-full bg-gray-700 text-white p-4">
          <a href="#">
            <span className="font-semibold text-xl tracking-tight">
              Nolatech
            </span>
          </a>
          <div className="md:items-center md:w-auto flex">
            <div className="md:flex hidden">
              <a className="block md:text-white mr-4" href="#">
                Link 1
              </a>
            </div>
            <div className="flex text-sm font-semibold">
              <Button text="Logout" onClick={logout} />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
