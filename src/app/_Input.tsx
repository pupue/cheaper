import React, { ComponentProps } from "react";

type Props = ComponentProps<"input"> & {
  label: string;
};

export const Input = ({ label, ...props }: Props) => {
  return (
    <div className="grid gap-1">
      <div className="text-xs">{label}</div>
      <input {...props} className="w-full border-b border-black bg-gray-100 rounded-t-[4px] p-2" />
    </div>
  );
};
