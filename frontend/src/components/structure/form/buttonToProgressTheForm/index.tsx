import React from "react";
import { Spinner } from "../../";
import { useCookies } from "react-cookie";
import { api } from "../../../../lib/axios";

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
  const [cookie, setCookie] = useCookies(["id"]);
  const step = Number(localStorage.getItem("step"));
  const updatedData = "1";

  const updatedDataString = String(updatedData);

  async function handleResetForm() {
    setLoading(true);
    const id = cookie;

    if (id) {
      api.delete("/user/reset", { data: { id: id } }).then(() => {
        setCookie("id", "", { path: "/" });
      });
    }

    localStorage.setItem("step", updatedDataString);
    setLoading(false);
    window.location.reload();
  }

  return (
    <div className="flex justify-center mt-4">
      {loading ? (
        <div className="py-2 px-12">
          <Spinner />
        </div>
      ) : (
        <>
          <button
            onClick={handleResetForm}
            className="transition-all duration-300 ease-in-out bg-gray-300 hover:bg-red-500 hover:text-white text-gray-800 py-2 px-12 rounded m-2 mr-5"
          >
            Cancelar
          </button>
          <button
            onClick={handle}
            className={`transition-all duration-300 ease-in-out ${
              step === 4 ? "bg-green-600" : "bg-gray-500"
            } hover:bg-blue-600 text-white py-2 px-12 rounded m-2 ml-5`}
          >
            {step === 4 ? "Cadastrar" : "Próximo"}
          </button>
        </>
      )}
    </div>
  );
}
