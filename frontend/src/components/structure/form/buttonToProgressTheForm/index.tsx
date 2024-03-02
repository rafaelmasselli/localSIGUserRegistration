import React, { useEffect } from "react";
import { Spinner } from "../../";
import { useCookies } from "react-cookie";
import { api } from "../../../../lib/axios";
import { useStepContext, useUserContext } from "../../../../hook";

interface IButtonToProgressTheForm {
  handle: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ButtonToProgressTheForm({
  handle,
  loading,
  setLoading,
}: IButtonToProgressTheForm) {
  const [cookie, , removeCookie] = useCookies(["id"]);
  const { step, updateStep } = useStepContext();
  const { updateUser } = useUserContext();

  async function handleResetForm() {
    setLoading(true);
    const id = cookie;

    if (id) {
      api.delete("/user/reset", { data: { id: id } }).then(() => {
        removeCookie("id");
      });
    }
    updateUser({
      fullName: "",
      cpf: "",
      maritalStatus: "",
      birthDate: "",
      age: 0,
    });
    updateStep(1);
    setLoading(false);
  }
  useEffect(() => {}, [step, updateStep]);

  return (
    <div className="flex justify-center mt-4 mobile:flex-row flex-col-reverse">
      {loading ? (
        <div className="py-2 px-12">
          <Spinner />
        </div>
      ) : (
        <>
          <button
            onClick={handleResetForm}
            className="transition-all duration-300 ease-in-out bg-gray-300 hover:bg-red-500 hover:text-white text-gray-800 py-2 px-12 rounded m-2 mobile:mx-5 mx-2"
          >
            Cancelar
          </button>
          <button
            onClick={handle}
            className={`transition-all duration-300 ease-in-out ${
              step === 4 ? "bg-green-600" : "bg-gray-500"
            } hover:bg-blue-600 text-white py-2 px-12 rounded m-2 mobile:mx-5 mx-2`}
          >
            {step === 4 ? "Cadastrar" : "Próximo"}
          </button>
        </>
      )}
    </div>
  );
}
