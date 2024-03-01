export function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white border-b backdrop-blur-lg bg-opacity-80">
      <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 ">
        <div className="relative flex h-16 justify-between">
          <div className="flex flex-1 items-stretch justify-start">
            <a className="flex flex-shrink-0 items-center" href="#">
              <img
                className="block h-12 w-auto"
                src="https://www.localsig.com.br/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.327cc381.png&w=48&q=75"
              />
            </a>
          </div>
          <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-8">
            <a
              className="text-gray-700 hover:text-indigo-700 text-sm font-medium"
              href="#"
            >
              Inicio
            </a>
            <a
              className="text-gray-800 bg-indigo-100 hover:bg-indigo-200 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm "
              href="#"
            >
              Cadastrar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
