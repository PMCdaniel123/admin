"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText: React.FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addValue = (item: string) => {
    onChange(item);
    setInputValue("");
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-1 flex-wrap">
        {value.map((item, index) => (
          <Badge key={index} className="bg-tertiary text-white mb-4">
            {item}
            <button
              type="button"
              className="ml-1 p-[2px] rounded-full outline-none"
              onClick={() => onRemove(item)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>

      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addValue(inputValue);
          }
        }}
      />
    </div>
  );
};

export default MultiText;
