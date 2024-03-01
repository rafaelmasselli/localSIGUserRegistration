interface IIpunt {
  label: string;
  type: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

export function Input({ label, type, onChange, placeholder }: IIpunt) {
  return (
    <div className="flex justify-center">
      <div>
        <label
          htmlFor={type}
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          {label}
        </label>

        <input
          onChange={(event) => onChange(event.target.value)}
          type={type}
          id="email"
          className="w-[350px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}
