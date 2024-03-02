import { useEffect, useState } from "react";
import { ButtonToProgressTheForm, ErrorModal, Input } from "../..";
import { api } from "../../../../lib/axios";
import { useStepContext } from "../../../../hook";

import { useCookies } from "react-cookie";

export function CreateAddress() {
  const { step, updateStep } = useStepContext();
  const [loading, setLoading] = useState<boolean>(false);

  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");

  const [, setCookie] = useCookies(["id"]);

  function openModal(description: string) {
    setDescription(description);
    setShowModal(true);
    setLoading(false);
  }

  useEffect(() => {}, [step, updateStep]);

  async function handleValidateEmailAndPassword() {
    setLoading(true);
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
          onChange={undefined}
        />
      </div>
      <ButtonToProgressTheForm
        setLoading={setLoading}
        handle={handleValidateEmailAndPassword}
        loading={loading}
      />
    </div>
  );
}
