import { useEffect } from "react";
import { Step } from "../../components/structure";
import { useNavigate } from "react-router-dom";

import {
  ConfirmEmailAndPhoneCode,
  CreateUser,
  VerifyEmailAndTelephone,
} from "../../components/structure/form";
import { useStepContext } from "../../hook/";
import { CreateAddress } from "../../components/structure/form/createAddress";

export function Register() {
  const { step, updateStep } = useStepContext();
  const navigate = useNavigate();

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
      case 5:
        navigate("/");
        return null;
    }
  };

  useEffect(() => {
    updateStep(step);
  }, [step, updateStep]);

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex justify-center text-center">
          <h1 className="font-semibold text-xl mobile:text-2xl mb-6 mt-6">
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
