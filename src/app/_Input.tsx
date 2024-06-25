import React, { ComponentProps } from "react";

type Props = ComponentProps<"input"> & {
  label: string;
};

export const Input = ({ label, ...props }: Props) => {
  return (
    <div className="">
      <div className="text-xs">{label}</div>
      <input
        {...props}
        className="text-md w-full border-b border-black bg-white rounded-b-0 rounded-t-[4px] px-2 py-3 leading-none"
      />
    </div>
  );
};
