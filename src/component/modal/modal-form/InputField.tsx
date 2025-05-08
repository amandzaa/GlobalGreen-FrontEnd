import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const InputField = ({ name, label, ...rest }: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1 font-medium">
        {label}
      </label>
      <input
        id={name}
        {...register(name)}
        {...rest}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors[name] && (
        <p className="text-sm text-red-500 mt-1">
          {(errors[name]?.message as string) || "This field is required"}
        </p>
      )}
    </div>
  );
};
