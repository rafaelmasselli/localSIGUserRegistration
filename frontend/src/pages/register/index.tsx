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
    "Cadastro de email e telefone",
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

  useEffect(() => {
    updateStep(step);
  }, [step, updateStep]);

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
