import { useEffect } from "react";
import { Step } from "../../components/structure";
import {
  ConfirmEmailAndPhoneCode,
  CreateUser,
  VerifyEmailAndTelephone,
} from "../../components/structure/form";

export function Home() {
  let step: string | null = localStorage.getItem("step");
  step = step ? step : "1";
  const stepNumber = Number(step);
  const Steps = [1, 2, 3, 4];
  const phases = [
    "Cadastro de email e telefone",
    "Confirma o código do telefone e do celular",
    "Adicionar informações de usuário",
    "Endereço do usuário",
  ];

  const getCompStep = () => {
    switch (Number(step)) {
      case 1:
        return <VerifyEmailAndTelephone />;
      case 2:
        return <ConfirmEmailAndPhoneCode />;
      case 3:
        return <CreateUser />;
    }
  };

  useEffect(() => {
    localStorage.setItem("step", step);
  }, [step]);

  return (
    <div className="min-h-screen mt-2 flex items-center justify-center ">
      <div className="max-w-2xl shadow-2xl p-12 flex flex-col items-center ">
        <h1 className="font-bold text-xl mb-6 mt-[-12px]">
          {phases[stepNumber - 1]}
        </h1>
        <div className="flex justify-between mb-4 ">
          {Steps.map((item) => (
            <Step
              className="m-2"
              key={item}
              index={item}
              active={stepNumber === item}
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
