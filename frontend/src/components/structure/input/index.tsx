import React, { useState } from "react";

interface IIpunt {
  label: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: any;
  placeholder: string;
  maxLength?: number;
  mask?: (value: string) => string;
}

export function Input({
  label,
  type,
  onChange,
  placeholder,
  maxLength,
  mask,
}: IIpunt) {
  const [value, setValue] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let val = event.target.value;
    if (mask) {
      val = mask(val);
    }
    setValue(val);
    onChange(val);
  };

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
          onChange={handleChange}
          type={type}
          value={value}
          id="email"
          className="w-[250px] mine_mobile:w-[300px] mobile:w-[350px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
          placeholder={placeholder}
          required
          maxLength={maxLength}
        />
      </div>
    </div>
  );
}
