export function CardUser() {
  return (
    <div className="w-full max-w-full mb-8 sm:w-1/2 px-4 lg:w-1/3 flex flex-col">
      <img
        src="https://source.unsplash.com/7JX0-bfiuxQ/400x300"
        alt="Card img"
        className="object-cover object-center w-full h-48"
      />
      <div className="flex flex-grow">
        <div className="triangle"></div>
        <div className="flex flex-col justify-between px-4 py-6 bg-white border border-gray-400">
          <div>
            <a
              href="#"
              className="inline-block mb-4 text-xs font-bold capitalize border-b-2 border-blue-600 hover:text-blue-600"
            >
              Intellectual Capital
            </a>
            <a
              href="#"
              className="block mb-4 text-2xl font-black leading-tight hover:underline hover:text-blue-600"
            >
              5 Things To Do About Rain
            </a>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione,
              neque. Eius, ea possimus.
            </p>
          </div>
          <div>
            <a
              href="#"
              className="inline-block pb-1 mt-2 text-base font-black text-blue-600 uppercase border-b border-transparent hover:border-blue-600"
            >
              Read
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
