import { useState } from "react";
import { api } from "../../../lib/axios";

interface IUser {
  age: number;
  birthDate: string;
  cpf: string;
  email: string;
  fullName: string;
  id: string;
  maritalStatus: string;
  phone: string;
  city: string;

  neighborhood: string;
  number: number;
  street: string;
  uf: string;
  zipCode: string;
}

export function CardUser({
  fullName,
  cpf,
  id,
  age,
  birthDate,
  email,
  phone,
  maritalStatus,
  city,
  street,
  neighborhood,
  number,
  uf,
}: IUser) {
  const [showModal, setShowModal] = useState(false);

  function hideCpf(str: string): string {
    return "X".repeat(str.length - 3) + str.slice(-7);
  }

  function addPhoneNumberMask(phone: string): string {
    const number = phone.replace(/\D/g, "");

    const ddd = phone.slice(0, 2);
    const parte1 = phone.slice(2, 4);
    const parte2 = phone.slice(4, 9);
    const parte3 = number.slice(9, 13);
    return `(${ddd}) ${parte1} ${parte2}-${parte3}`;
  }

  function formatDate(date: string): string {
    const parts = date.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${day}/${month}/${year}`;
    } else {
      return date;
    }
  }

  function translateMaritalStatus(status: string) {
    if (status === "Single") {
      return "Solteiro";
    } else if (status === "Married") {
      return "Casado";
    } else if (status === "Separated") {
      return "Separado";
    } else if (status === "Divorced") {
      return "Divorciado";
    } else if (status === "Widowed") {
      return "Viúvo";
    } else {
      return status;
    }
  }

  async function handleDeleteUser() {
    await api.delete(`/user/delete/${id}`);
  }

  return (
    <div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-xl">
              <div className="border-0  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-4 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Endereço do {fullName}
                  </h3>
                </div>
                <div className="relative mt-[-20px] mb-[-20px] p-6 flex-auto">
                  <p className="text-gray-700 text-base font-bold ">
                    <strong>Cidade</strong>
                    <br></br> {`${city} ${uf}`}
                  </p>
                  <p className="text-gray-700 text-base font-bold mt-2">
                    <strong>Local da moradia</strong>
                    <br></br> {street}
                  </p>

                  <p className="text-gray-700 text-base font-bold mt-2">
                    <strong>Rua</strong>
                    <br></br>
                    {neighborhood}
                  </p>
                  <p className="text-gray-700 text-base font-bold mt-2">
                    <strong>Numero</strong>
                    <br></br>
                    {number}
                  </p>
                </div>
                <div className="flex items-center justify-end p-2 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-10 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Sair
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <div className="max-w-72 m-5 rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4 flex flex-col justify-center">
          <div className="font-bold text-xl mb-2 mt-4">{fullName}</div>
          <div>
            <p className="text-gray-700 text-base font-normal mt-2">
              <strong>Data de nascimento</strong>
              <br></br> {formatDate(birthDate)}
            </p>
            <p className="text-gray-700 text-base font-normal mt-2">
              <strong>Idade</strong>
              <br></br> {age}
            </p>

            <p className="text-gray-700 text-base font-normal mt-2">
              <strong>Numero de Telefone</strong>
              <br></br>
              {addPhoneNumberMask(phone)}
            </p>

            <p className="text-gray-700 text-base font-normal mt-2">
              <strong>CPF</strong>
              <br></br>
              {hideCpf(cpf)}
            </p>
            <p className="text-gray-700 text-base font-normal mt-2">
              <strong>E-mail</strong>
              <br></br>
              {email}
            </p>
            <p className="text-gray-700 text-base font-normal mt-2">
              <strong>Estado civil</strong>
              <br></br>
              {translateMaritalStatus(maritalStatus)}
            </p>
          </div>
          <div className="flex justify-center flex-col">
            <button
              onClick={() => setShowModal(true)}
              className="mt-6 justify-center px-4  py-2 bg-blue-500 text-white active:bg-blue-600 text-xs font-bold uppercase  rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0  ease-linear transition-all duration-150 flex"
            >
              Exibir endereço
            </button>
            <button
              onClick={handleDeleteUser}
              className="mt-2 justify-center px-4  py-2 bg-red-500 text-white active:bg-blue-600 text-xs font-bold uppercase  rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0  ease-linear transition-all duration-150 flex"
            >
              Deletar usuário
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
