import { useState } from "react";
import { Step } from "../../components/structure/step";
import { VerifyEmailAndTelephone } from "../../components/structure/form/verifyEmailAndTelephone";

export function Home() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const Steps = [1, 2, 3, 4];
  const phases = [
    "Cadastro de email e telefone",
    "Confirma o codigo do telefone e do celular",
    "Adiconar informacoes de usuario",
    "Endereco do usuario",
  ];

  const getCompStep = () => {
    switch (step) {
      case 1:
        return <VerifyEmailAndTelephone email={email} setEmail={setEmail} />;
    }
  };

  function handleForm() {
    step !== 3 && setStep(step + 1);
    if (step == 1) {
    }
  }

  return (
    <div className="min-h-screen mt-[-50px] flex items-center justify-center ">
      <div className="max-w-2xl shadow-2xl p-12 flex flex-col items-center ">
        <h1 className="font-bold text-xl mb-6 mt-[-12px]">
          {phases[step - 1]}
        </h1>
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

        <div className="flex justify-between mt-4">
          <button
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-12 rounded m-2"
          >
            Voltar
          </button>
          <button
            onClick={handleForm}
            className={`${
              step === 3 ? "bg-red-600" : "bg-gray-500"
            } hover:bg-blue-600 text-white py-2 px-12 rounded m-2`}
          >
            {step === 3 ? "Enviar" : "Próximo"}
          </button>
        </div>
      </div>
    </div>
  );
}
