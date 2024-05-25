import React from "react";

const InputField = ({
  type,
  placeholder,
  register,
  required,
  registerName,
}) => {
  return (
    <div className="my-6">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-1 py-2 border-b border-gray-800 bg-transparent outline-0"
        {...register(registerName, { required })}
      />
      <p>
        {required && (
          <span role="alert" className="text-red-700 px-5">
            *{placeholder} is required
          </span>
        )}
      </p>
    </div>
  );
};

export default InputField;
