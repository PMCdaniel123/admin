"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import React from "react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onUpload = (response: any) => {
    onChange(response.info.secure_url);
  };

  return (
    <div>
      <CldUploadWidget uploadPreset="lg4awzat" onSuccess={onUpload}>
        {({ open }) => {
          return (
            <Button
              type="button"
              onClick={() => open()}
              className="bg-primary text-white"
            >
              <Plus className="h-4 w-4 mr-2" /> Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        {value.map((url, index) => (
          <div key={index} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-1 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
