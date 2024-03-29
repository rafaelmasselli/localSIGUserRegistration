import { useEffect, useState } from "react";
import { ErrorModal, ButtonToProgressTheForm, Input } from "../../";
import { api } from "../../../../lib/axios";
import { useCookies } from "react-cookie";
import { useStepContext } from "../../../../hook";

export function ConfirmEmailAndPhoneCode() {
  const { step, updateStep } = useStepContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [emailCode, setEmailCode] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>("");

  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");

  const [cookie] = useCookies(["id"]);

  const numberMask = (value: string) => value.replace(/\D/g, "");
  const stringMask = (value: string) => value.replace(/\d/g, "").toUpperCase();

  function openModal(description: string) {
    setDescription(description);
    setShowModal(true);
    setLoading(false);
  }

  async function handleConfirmEmailAndPhoneCode() {
    setLoading(true);
    const id = cookie.id;

    if (!emailCode || emailCode.length != 7)
      openModal("Código de verificação do email esta incorreta");
    else if (!phoneCode || phoneCode.length != 7)
      openModal("Código de verificação do telefone esta incorreta");

    await api
      .post("/user/confirm/code", { id, emailCode, phoneCode })
      .then(() => {
        updateStep(step + 1);
      })
      .catch(() => {
        openModal(
          "Código de verificação do email ou do telefone esta invalido"
        );
      });

    setLoading(false);
  }

  useEffect(() => {}, [step, updateStep]);

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
            placeholder="1234567"
            type="string"
            label="Código de verificação do email"
            onChange={setEmailCode}
            maxLength={7}
            mask={numberMask}
          />
        </div>
        <div className="mt-2">
          <Input
            placeholder="ABCDEF"
            type="string"
            label="Código de verificação do telefone"
            onChange={setPhoneCode}
            maxLength={7}
            mask={stringMask}
          />
        </div>

        <ButtonToProgressTheForm
          setLoading={setLoading}
          loading={loading}
          handle={handleConfirmEmailAndPhoneCode}
        />
      </div>
    </div>
  );
}
