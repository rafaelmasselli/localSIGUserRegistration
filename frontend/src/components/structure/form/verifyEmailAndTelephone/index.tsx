import countries from "../../../../utils/countries";
import { useEffect, useState } from "react";
import { ButtonToProgressTheForm, ErrorModal, Phone, Input } from "../..";
import { api } from "../../../../lib/axios";

import { useCookies } from "react-cookie";

export function VerifyEmailAndTelephone() {
  const [email, setEmail] = useState<string>("");
  const [ddd, setDdd] = useState<string>("");
  const [numberDdd, setNumberDdd] = useState<string | undefined>(undefined);
  const [number, setNumber] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [, setCookie] = useCookies(["id"]);
  const step = Number(localStorage.getItem("step"));
  const stringValue = String(Number(step) + 1);

  function openModal(description: string) {
    setDescription(description);
    setShowModal(true);
    setLoading(false);
  }

  useEffect(() => {
    countries.filter((country) => {
      if (country[2].includes(ddd)) {
        setNumberDdd(country[3]);
      }
    });
  }, [ddd]);

  async function handleValidateEmailAndPassword() {
    setLoading(true);

    if (!email) openModal("O campo 'e-mail' não pode ficar vazio");
    else if (!email.includes("@")) openModal("Cadastre um e-mail válido.");
    else if (!number)
      openModal("O campo 'Número de Telefone' não pode ficar vazio.");
    else if (!ddd) openModal("O campo DDD não pode ficar em branco.");
    else if (number.length < 13)
      openModal(
        "O número de telefone deve ser composto por, no mínimo, 11 dígitos."
      );
    else {
      const phoneWithoutMask = number && number.replace(/\D/g, "");
      const phone = (numberDdd + phoneWithoutMask).replace(/\D/g, "");
      const telephone = phone.substring(0, 13);

      if (number?.length < 11)
        openModal("O numero de telefone deve conter 11 números");
      else {
        await api
          .post("/user/create/code", {
            telephone,
            email,
          })
          .then((res) => {
            localStorage.setItem("step", stringValue);
            setCookie("id", res.data.id, { path: "/" });
          })
          .catch((error) => {
            if (error.message == "Request failed with status code 409")
              openModal("Este e-mail já está registrado em nosso sistema.");
            else if (error.message)
              openModal("O número de telefone ou e-mail fornecido é inválido.");
          });
        setLoading(false);
      }
    }
  }

  return (
    <div className="w-full h-full mt-[-30px]">
      <div className="w-full">
        <ErrorModal
          description={description}
          setShowModal={setShowModal}
          showModal={showModal}
        />
        <Input
          placeholder="joh.doe@company.com"
          label="E-mail"
          type="email"
          onChange={setEmail}
        />
        <div className="flex justify-center mt-2">
          <div>
            <Phone className="">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                DDD do telefone
              </label>
              <Phone.Country
                onChange={(event) => setDdd(event.target.value)}
                className="w-[350px]
              bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              />
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 mt-2 "
              >
                Numero de telefone
              </label>
              <Phone.Number
                onChange={(event) => setNumber(event.target.value)}
                placeholder="6 12 34 56 78"
                className="w-[350px]
                bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              />
            </Phone>
          </div>
        </div>
      </div>
      <ButtonToProgressTheForm
        setLoading={setLoading}
        handle={handleValidateEmailAndPassword}
        loading={loading}
      />
    </div>
  );
}
