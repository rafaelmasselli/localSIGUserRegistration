import { useNavigate } from "react-router-dom";

import { useStepContext } from "../../hook/";
export function CreateUserSuccess() {
  const { updateStep } = useStepContext();

  const navigate = useNavigate();

  async function handleGoBackToTheBeginning() {
    updateStep(1);
    navigate("/");
  }
  return (
    <div className="bg-gray-200 w-full h-screen flex items-center justify-center">
      <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-12 py-8 rounded-lg shadow-2xl">
        <p className="text-xl md:text-1xl lg:text-2xl font-bold tracking-wider text-gray-500 mt-4">
          Usuário criado com sucesso
        </p>

        <button
          onClick={handleGoBackToTheBeginning}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150"
          title="Return Home"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>Voltar para o Inicio</span>
        </button>
      </div>
    </div>
  );
}
