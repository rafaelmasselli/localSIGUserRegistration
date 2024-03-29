import { useEffect, useState } from "react";
import { Input, ButtonToProgressTheForm, ErrorModal } from "../../";
import { format } from "date-fns";
import { useUserContext, useStepContext } from "../../../../hook";

export function CreateUser() {
  const { step, updateStep } = useStepContext();
  const { updateUser, user } = useUserContext();

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [description, setDescription] = useState("");

  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [cpf, setCpf] = useState("");

  const [maritalStatus, setMaritalStatus] = useState("Single");

  const cpfMask = (value: string) => {
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

  const stringCpfMask = (value: string) => cpfMask(value);

  function openModal(description: string) {
    setDescription(description);
    setShowModal(true);
    setLoading(false);
  }

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
    else if (cpf.length < 13) openModal("O campo CPF deve conter 11 números");
    else if (year < 1902 || year > yearCurrent)
      openModal("Ano invalido, insira o ano que voce nasceu");
    else {
      updateUser({
        fullName,
        cpf,
        age,
        birthDate,
        maritalStatus,
      });
      updateStep(step + 1);
      setLoading(false);
    }
  }

  useEffect(() => {}, [user, step, updateStep]);

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
            mask={stringCpfMask}
            label="CPF"
            onChange={setCpf}
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
              value={maritalStatus}
              onChange={(event) => {
                setMaritalStatus(event.target.value);
              }}
              id="cars"
              className="w-[350px] max-mine_mobile:w-[250px] max-mobile:w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
            >
              <option className="" value="Single">
                Solteiro(a)
              </option>
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
