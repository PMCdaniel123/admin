"use client";

import React, { useState } from "react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  let selected: CollectionType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[];
  }

  const selectables = collections.filter(
    (collection) => !selected.includes(collection)
  );

  return (
    <Command className="overflow-visible bg-white h-fit">
      <div className="flex flex-col flex-wrap border rounded-md">
        <div className="flex gap-1 flex-wrap p-1">
          {selected.map((collection) => (
            <Badge key={collection._id} className="bg-tertiary text-white">
              {collection.title}
              <button
                type="button"
                className="ml-1"
                onClick={() => onRemove(collection._id)}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          className="w-full"
        />
      </div>
      {open && (
        <div className="relative mt-2">
          <CommandGroup className="absolute w-full z-10 top-0 overflow-auto border rounded-md shadow-md">
            {selectables.map((collection) => (
              <CommandItem
                className="hover:bg-grey-2 cursor-pointer"
                key={collection._id}
                onMouseDown={(e) => e.preventDefault()}
                onSelect={() => {
                  onChange(collection._id);
                  setInputValue("");
                }}
              >
                {collection.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </div>
      )}
    </Command>
  );
};

export default MultiSelect;
