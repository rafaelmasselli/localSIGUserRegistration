interface IVerifyEmailAndTelephone {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export function VerifyEmailAndTelephone({
  email,
  setEmail,
}: IVerifyEmailAndTelephone) {
  return (
    <div className="w-full h-full mt-[-20px]">
    
      <div className="w-full">
        <div className="flex justify-center">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="w-[350px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
              placeholder="john.doe@company.com"
              required
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Numero de telefone
            </label>
            <input
              type="email"
              id="email"
              className="w-[350px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5  "
              placeholder="john.doe@company.com"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
