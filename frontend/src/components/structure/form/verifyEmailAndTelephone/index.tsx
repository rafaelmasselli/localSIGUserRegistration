import { Phone } from "../../telephoneNumberAndAreaCode";
import countries from "../../../../utils/countries";
import { useEffect, useState } from "react";
import { ButtonToProgressTheForm } from "../buttonToProgressTheForm";
import { api } from "../../../../lib/axios";
import { ErrorModal } from "../../errorModal";

interface IVerifyEmailAndTelephone {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export function VerifyEmailAndTelephone({
  setStep,
  step,
}: IVerifyEmailAndTelephone) {
  const [email, setEmail] = useState<string>("");
  const [ddd, setDdd] = useState<string>("");
  const [numberDdd, setNumberDdd] = useState<string | undefined>(undefined);
  const [number, setNumber] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

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
    else {
      const phoneWithoutMask = number && number.replace(/\D/g, "");
      const phone = numberDdd + phoneWithoutMask;

      await api
        .post("/user/create/code", {
          telephone: phone,
          email,
        })
        .then((res) => {
          // setStep(step + 1);
          // setLoading(false);
          console.log(res.data.id);
        })
        .catch((error) => {
          setLoading(false);
          if (error.message == "Request failed with status code 409")
            openModal("Este e-mail já está registrado em nosso sistema.");
          else if (error.message)
            openModal("O número de telefone ou e-mail fornecido é inválido.");
        });
    }
  }

  return (
    <div className="w-full h-full mt-[-20px]">
      <div className="w-full">
        <ErrorModal
          description={description}
          setShowModal={setShowModal}
          showModal={showModal}
        />
        <div className="flex justify-center">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email
            </label>
            <input
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              id="email"
              className="w-[350px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
              placeholder="john.doe@company.com"
              required
            />
          </div>
        </div>
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
        handle={handleValidateEmailAndPassword}
        setStep={setStep}
        step={step}
        loading={loading}
      />
    </div>
  );
}
