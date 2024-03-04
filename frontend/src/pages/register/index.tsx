import { useEffect } from "react";
import { Step } from "../../components/structure";

import {
  ConfirmEmailAndPhoneCode,
  CreateUser,
  VerifyEmailAndTelephone,
} from "../../components/structure/form";
import { useStepContext } from "../../hook/";
import { CreateAddress } from "../../components/structure/form/createAddress";

export function Register() {
  const { step, updateStep } = useStepContext();

  const Steps = [1, 2, 3, 4];
  const phases = [
    `Cadastro de email e telefone`,
    "Confirma o código do telefone e do celular",
    "Adicionar informações de usuário",
    "Endereço do usuário",
  ];

  const getCompStep = () => {
    switch (step) {
      case 1:
        return <VerifyEmailAndTelephone />;
      case 2:
        return <ConfirmEmailAndPhoneCode />;
      case 3:
        return <CreateUser />;
      case 4:
        return <CreateAddress />;
    }
  };

  async function handleGoBackToTheBeginning() {
    updateStep(1);
  }

  useEffect(() => {
    updateStep(step);
  }, [step, updateStep]);

  const success = step == 5;

  return success ? (
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
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex justify-center text-center">
          <h1 className="w-[350px] max-mine_mobile:w-[250px] max-mobile:w-[300px] font-semibold text-lg mobile:text-xl mb-6 mt-6">
            {phases[step - 1]}
          </h1>
        </div>
        <div className="flex justify-between mb-4 ">
          {Steps.map((item) => (
            <Step
              className="m-2"
              key={item}
              index={item}
              active={step === item}
            />
          ))}
        </div>
        <hr className="my-4 border-black border-t" />
        <div className="w-full h-auto flex justify-center ">
          {getCompStep()}
        </div>
      </div>
    </div>
  );
}
