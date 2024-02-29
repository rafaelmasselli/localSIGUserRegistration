import { Phone } from "../../telephoneNumberAndAreaCode";
import countries from "../../../../utils/countries";
import { useEffect, useState } from "react";

interface IVerifyEmailAndTelephone {
  email: string;
  step: number;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export function VerifyEmailAndTelephone({
  setEmail,
  setStep,

  step,
}: IVerifyEmailAndTelephone) {
  const [ddd, setDdd] = useState<string>("");
  const [numberDdd, setNumberDdd] = useState<string | undefined>(undefined);
  console.log(numberDdd);

  useEffect(() => {
    countries.filter((country) => {
      if (country[2].includes(ddd)) {
        setNumberDdd(country[3]);
      }
    });
  }, [ddd]);

  function handle() {
    step !== 3 && setStep(step + 1);
  }

  return (
    <div className="w-full h-full mt-[-20px]">
      <div className="w-full">
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
                onChange={(event) => console.log(event.target.value)}
                placeholder="6 12 34 56 78"
                className="w-[350px]
                bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              />
            </Phone>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 ">
        <button
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-12 rounded m-2 mr-5"
        >
          Voltar
        </button>
        <button
          onClick={handle}
          className={`${
            step === 3 ? "bg-red-600" : "bg-gray-500"
          } hover:bg-blue-600 text-white py-2 px-12 rounded m-2 ml-5`}
        >
          {step === 3 ? "Enviar" : "Próximo"}
        </button>
      </div>
    </div>
  );
}
