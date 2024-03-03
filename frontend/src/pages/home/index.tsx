import { CardSections } from "../../components/structure/cardSections";

export function Home() {
  return (
    <div className="flex justify-center mt-[150px]">
      <div className="min-h-screen">
        <CardSections
          title="Registrar um novo usuário"
          description="Registro de usuário, com a função de confirmação de e-mail e
            telefone, em um formulário progressivo."
          rote="/register"
        />
        <CardSections
          title="Exibir todos os usuários."
          description="Exibir todos os usuários de acordo com a data em que foram
          criados."
          rote="/users"
        />
      </div>
    </div>
  );
}
