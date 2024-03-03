import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white border-b backdrop-blur-lg bg-opacity-80 shadow">
      <div className="mx-auto max-w-7xl px-1 sm:px-6 lg:px-8 ">
        <div className="relative flex h-16 ">
          <div className="flex flex-1 items-stretch justify-start">
            <Link className="flex flex-shrink-0 items-center" to="/ ">
              <img
                className="block  w-auto"
                src="https://www.localsig.com.br/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.327cc381.png&w=48&q=75"
              />
            </Link>
          </div>
          <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-8">
            <Link
              className="text-gray-700 hover:text-indigo-700 text-sm font-medium"
              to="/"
            >
              Inicio
            </Link>
            <Link
              className="bg-blue-500 text-white active:bg-blue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0  ease-linear transition-all duration-150 flex"
              to="/register"
            >
              Cadastrar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
