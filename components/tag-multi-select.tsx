"use client";

import Select from "react-select";

interface TagSelectProps {
  value: { value: string; label: string }[];
  onChange: (value: { value: string; label: string }[]) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function TagSelect({
  value,
  onChange,
  options,
  placeholder = "Selecciona tags...",
}: TagSelectProps) {
  return (
    <Select
      options={options}
      value={value}
      onChange={(newValue) =>
        onChange(Array.isArray(newValue) ? [...newValue] : [])
      }
      isMulti
      placeholder={placeholder}
      classNames={{
        control: () =>
          "border-input rounded-md border bg-transparent shadow-xs border-2 focus:border-primary ",
        multiValue: () => "bg-gray-200 rounded-md ",
        multiValueLabel: () => "text-gray-800",
        menu: () => "z-50",
      }}
    />
  );
}
