import React from "react";
import { Spinner } from "../../spinner";

interface IButtonToProgressTheForm {
  step: number;
  handle: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}

export function ButtonToProgressTheForm({
  handle,
  setStep,
  step,
  loading,
}: IButtonToProgressTheForm) {
  return (
    <div className="flex justify-center mt-4">
      {loading ? (
        <div className="py-2 px-12">
          <Spinner />
        </div>
      ) : (
        <>
          <button
            onClick={() => setStep(step - 1)}
            className="transition-all duration-300 ease-in-out bg-gray-300 hover:bg-red-500 hover:text-white text-gray-800 py-2 px-12 rounded m-2 mr-5"
          >
            Cancelar
          </button>
          <button
            onClick={handle}
            className={`transition-all duration-300 ease-in-out ${
              step === 3 ? "bg-red-600" : "bg-gray-500"
            } hover:bg-blue-600 text-white py-2 px-12 rounded m-2 ml-5`}
          >
            {step === 3 ? "Cadastrar" : "Próximo"}
          </button>
        </>
      )}
    </div>
  );
}
