import { useContext } from "react";
import { Button } from "../Button";
import { userContext } from "../../../context/UserContext";

export const Header = () => {
  const { logout } = useContext(userContext)!;
  return (
    <>
      <div className="w-full h-screen">
        <header className="bg-teal-400">
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
        <main className="flex justify-center items-center">
          <h1 className="text-3xl text-center">Welcome</h1>
        </main>
        <div className="bottomNav fixed bottom-0 w-full">
          <nav className="md:hidden bottom-0 w-full bg-gray-700 text-xs">
            <ul className="flex justify-around items-center text-white text-center opacity-75 text-lg font-bold">
              <li className="p-4 hover:bg-gray-500">
                <a href="#">
                  <span>Link 1</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
