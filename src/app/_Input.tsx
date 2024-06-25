import React, { ComponentProps } from "react";

type Props = ComponentProps<"input"> & {
  label: string;
  error?: string;
};

export const Input = ({ label, error, required, ...props }: Props) => {
  return (
    <div className="">
      <div className="text-xs">
        {label}
        {required && <span className="text-error">*</span>}
      </div>
      <input
        {...props}
        className={`${
          error ? "border-error" : "border-black"
        } text-md w-full border-b bg-white rounded-b-0 rounded-t-[4px] px-2 py-3 leading-none`}
      />
      <p className="text-error text-xs">{error}</p>
    </div>
  );
};
