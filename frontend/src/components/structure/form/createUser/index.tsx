import { useEffect, useState } from "react";
import { ErrorModal } from "../../errorModal";
import { ButtonToProgressTheForm } from "../buttonToProgressTheForm";
import { Input } from "../../input";
import { format } from "date-fns";
import { useUserContext } from "../../../../hook/user";

export function CreateUser() {
  const { updateUser, user } = useUserContext();

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [description, setDescription] = useState("");

  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [maritalStatus, setMaritalStatus] = useState("");

  const zipCodeMask = (value: string) => {
    value = value.replace(/\D/g, "");

    if (value.length > 3) {
      value = value.replace(/(\d{3})/, "$1.");
    }

    if (value.length > 7) {
      value = value.replace(/(\d{3})\.(\d{3})/, "$1.$2.");
    }

    if (value.length > 11) {
      value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})/, "$1.$2.$3-");
    }

    return value;
  };

  const stringZipCodeMask = (value: string) => zipCodeMask(value);

  function openModal(description: string) {
    setDescription(description);
    setShowModal(true);
    setLoading(false);
  }

  const step = Number(localStorage.getItem("step"));
  const stringValue = String(Number(step) + 1);

  async function handleCreateUser() {
    setLoading(true);
    const month = Number(birthDate.substring(5, 7));
    const day = Number(birthDate.substring(8, 10));

    const data = new Date();
    const dataFormat = format(data, "dd/MM/yyyy");
    const year = Number(birthDate.substring(0, 4));

    const dayCurrent = Number(dataFormat.substring(0, 2));
    const monthCurrent = Number(dataFormat.substring(3, 5));
    const yearCurrent = Number(dataFormat.substring(6, 10));
    const age =
      month < monthCurrent || (month === monthCurrent && day < dayCurrent)
        ? yearCurrent - year
        : yearCurrent - year - 1;

    function validateName(fullName: string) {
      const nameWithoutSpaces = fullName.trim();

      const words = nameWithoutSpaces.split(/\s+/);
      if (words.length < 2) {
        return false;
      }

      const fistName = words[0];
      const secondName = words.slice(1).join(" ");

      if (fistName === "" || secondName === "") {
        return false;
      }

      return true;
    }

    if (!fullName || !validateName(fullName))
      openModal("Preencha o campo 'Nome completo' corretamente");
    else if (zipCode.length < 14)
      openModal("O campo CPF deve conter 11 números");
    else if (year < 1902 || year > yearCurrent)
      openModal("Ano invalido, insira o ano que voce nasceu");
    else {
      updateUser({
        fullName,
        zipCode,
        age,
        birthDate,
        maritalStatus,
      });

      localStorage.setItem("step", stringValue);
      setLoading(false);
    }
  }

  useEffect(() => {}, [user]);

  return (
    <div className="w-full h-full mt-[-30px]">
      <div className="w-full">
        <ErrorModal
          description={description}
          setShowModal={setShowModal}
          showModal={showModal}
        />
        <div className="">
          <Input
            placeholder="joh doe"
            type="string"
            label="Nome completo"
            onChange={setFullName}
          />
        </div>
        <div className="mt-2">
          <Input
            placeholder="XXX.XXX.XXX-XX"
            type="string"
            mask={stringZipCodeMask}
            label="CPF"
            onChange={setZipCode}
            maxLength={14}
          />
        </div>
        <div className="mt-2">
          <Input
            placeholder="DD/MM/AAAA"
            type="date"
            label="Data de Nascimento"
            onChange={setBirthDate}
          />
        </div>
        <div className="flex justify-center mt-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Estado Civil
            </label>

            <select
              onChange={(event) => {
                setMaritalStatus(event.target.value);
              }}
              id="cars"
              className="w-[350px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
            >
              <option value="Single">Solteiro(a)</option>
              <option value="Married">Casado(a)</option>
              <option value="Separated">Separado(a)</option>
              <option value="Divorced">Divorciado(a)</option>
              <option value="Widowed">Viúvo(a)</option>
            </select>
          </div>
        </div>
        <ButtonToProgressTheForm
          setLoading={setLoading}
          loading={loading}
          handle={handleCreateUser}
        />
      </div>
    </div>
  );
}
