import { useState } from "react";
import { Step } from "../../components/structure/step";
import { VerifyEmailAndTelephone } from "../../components/structure/form/verifyEmailAndTelephone";

export function Home() {
  const [step, setStep] = useState(1);

  const Steps = [1, 2, 3, 4];
  const phases = [
    "Cadastro de email e telefone",
    "Confirma o código do telefone e do celular",
    "Adicionar informações de usuário",
    "Endereço do usuário",
  ];

  const getCompStep = () => {
    switch (step) {
      case 1:
        return <VerifyEmailAndTelephone step={step} setStep={setStep} />;
    }
  };

  return (
    <div className="min-h-screen mt-2 flex items-center justify-center ">
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
      </div>
    </div>
  );
}
