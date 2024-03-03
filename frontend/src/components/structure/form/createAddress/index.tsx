import { useEffect, useState } from "react";
import { ButtonToProgressTheForm, ErrorModal, Input } from "../..";
import { api } from "../../../../lib/axios";
import { useStepContext, useUserContext } from "../../../../hook";

import { useCookies } from "react-cookie";

interface User {
  fullName: string;
  birthDate: string;
  cpf: string;
  maritalStatus: string;
  age: number;
  address?: Address;
}

interface Address {
  id: string;
  user: User;
  userId: string;
  street: string;
  zipCode: string;
  city: string;
  number: number;
  uf: string;
}

export function CreateAddress() {
  const { user, updateUser } = useUserContext();
  const { step, updateStep } = useStepContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);

  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");

  const [number, setNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [street, setStreet] = useState("");
  const [uf, setUf] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const [cookie, , removeCookie] = useCookies(["id"]);

  function openModal(description: string) {
    setDescription(description);
    setShowModal(true);
    setLoading(false);
  }
  const numberMask = (value: string) => value.replace(/\D/g, "");

  const cepMask = (value: string): string => {
    const maskedValue = value.replace(/^(\d{5})(\d{3})$/, "$1-$2");
    return maskedValue;
  };

  const zipCodeMask = (value: string) => cepMask(value.replace(/\D/g, ""));

  useEffect(() => {
    if (formError && !showModal) {
      updateStep(step - 1);
    }
  }, [formError, showModal, step, updateStep]);

  async function handleCreateUser() {
    setLoading(true);

    const ZipCode = zipCode.replace(/-/g, "");

    if (ZipCode && zipCode.length == 9) {
      await api
        .get(`https://viacep.com.br/ws/${ZipCode}/json/`)
        .then((response) => {
          setUf(response.data.uf);
          setCity(response.data.localidade);
        })
        .catch(() => {
          openModal("CEP incorreto");
        });
    }

    if (
      !user.age ||
      !user.birthDate ||
      !user.cpf ||
      !user.fullName ||
      !user.maritalStatus
    ) {
      openModal(
        "Houve um contratempo. Por favor, retorne à seção de inserção de dados para corrigir a situação."
      );
      setFormError(true);
    }

    if (uf == "" || city == "")
      openModal("Digite o CEP correspondente à sua cidade.");
    else if (Number(zipCode) < 9) openModal("O campo CEP está incompleto.");
    else if (!street) openModal("O campo 'Rua' não pode estar vazio.");
    else if (!number) openModal("O numero nao pode estar vazio");
    else
      api
        .post<User>("/user/create", {
          id: cookie.id,
          fullName: user.fullName,
          age: Number(user.age),
          maritalStatus: user.maritalStatus,
          birthDate: user.birthDate,
          cpf: user.cpf,
          number: Number(number),
          street,
          zipCode,
          city,
          uf,
          neighborhood,
        })
        .then(() => {
          updateStep(step + 1);
          removeCookie("id");
          updateUser({
            age: 0,
            birthDate: "",
            cpf: "",
            fullName: "",
            maritalStatus: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    setLoading(false);
  }
  return (
    <div className="w-full h-full mt-[-30px]">
      <div className="w-full">
        <ErrorModal
          description={description}
          setShowModal={setShowModal}
          showModal={showModal}
        />
        <div>
          <Input
            placeholder="01153-000"
            label="CEP"
            type="string"
            mask={zipCodeMask}
            maxLength={8}
            onChange={setZipCode}
          />
        </div>
        <div className="mt-2">
          <Input
            placeholder="Centro"
            label="Bairro"
            type="string"
            onChange={setStreet}
          />
        </div>
        <div className="mt-2">
          <Input
            placeholder="Rua santa teresa"
            label="Nome da Rua"
            type="string"
            onChange={setNeighborhood}
          />
        </div>
        <div className="mt-2">
          <Input
            placeholder="1332"
            label="Numero"
            type="string"
            onChange={setNumber}
            mask={numberMask}
          />
        </div>
      </div>
      <ButtonToProgressTheForm
        setLoading={setLoading}
        handle={handleCreateUser}
        loading={loading}
      />
    </div>
  );
}
