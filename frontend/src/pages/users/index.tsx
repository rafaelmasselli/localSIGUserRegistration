import React, { useEffect, useState } from "react";
import { CardUser } from "../../components/structure";
import { api } from "../../lib/axios";

interface IUser {
  age: number;
  birthDate: string;
  cpf: string;
  email: string;
  fullName: string;
  id: string;
  maritalStatus: string;
  phone: string;
  address: IAddress;
}

interface IAddress {
  city: string;
  createdAt: string;
  neighborhood: string;
  number: number;
  street: string;
  uf: string;
  zipCode: string;
}

export function Users() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    api.get("/user").then((res) => {
      setUsers(res.data);
    });
  }, [users]);

  return (
    <>
      {users.length === 0 ? (
        <div className="w-full h-screen flex items-center justify-center mt-[-50px] ">
          <h1 className="text-2xl mx-6">
            Atualmente, não há usuários cadastrados.
          </h1>
        </div>
      ) : (
        <div className="mt-24 flex justify-center flex-wrap">
          {users.map((user) =>
            user.address ? (
              <CardUser
                city={user.address.city}
                neighborhood={user.address.neighborhood}
                number={user.address.number}
                street={user.address.street}
                uf={user.address.uf}
                zipCode={user.address.zipCode}
                key={user.id}
                age={user.age}
                birthDate={user.birthDate}
                cpf={user.cpf}
                email={user.email}
                fullName={user.fullName}
                id={user.id}
                maritalStatus={user.maritalStatus}
                phone={user.phone}
              />
            ) : null
          )}
        </div>
      )}
    </>
  );
}
