/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useToast } from "@/hooks/use-toast";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { dataUrl, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { FileUpload } from "../ui/file-upload";

interface MediaUploaderProps {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  publicId: string;
  image: any;
  type: string;
}

const MediaUploader = ({
  onValueChange,
  setImage,
  publicId,
  image,
  type,
}: MediaUploaderProps) => {
  const { toast } = useToast();

  const onUploadSuccesHandler = (result: any) => {
    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    }));

    onValueChange(result?.info?.public_id);

    toast({
      title: "Success",
      description: "1 credit has been deducted",
      duration: 5000,
    });
  };

  const onUploadErrorHandler = () => {
    toast({
      title: "Error",
      description: "Error al subir la imagen",
      duration: 5000,
    });
  };

  

  return (
    <>
      <CldUploadWidget
        uploadPreset="ImageAI"
        options={{
          multiple: false,
          resourceType: "image",
        }}
        onSuccess={onUploadSuccesHandler}
        onError={onUploadErrorHandler}
      >
        {({ open }) => (
          <div className="flex flex-col gap-4">
            <h3 className="h3-bold text-dark-600">Upload Image</h3>

            {publicId ? (
              <>
                <div className="cursor-pointer overflow-hidden rounded-[10px]">
                  <CldImage
                    width={getImageSize(type, image, "width")}
                    height={getImageSize(type, image, "height")}
                    src={publicId}
                    alt="image"
                    sizes={"(max-width: 500px) 100vw, 50vw"}
                    placeholder={dataUrl as PlaceholderValue}
                    className="media-uploader_cldImage"
                  />
                </div>
              </>
            ) : (
              <div onClick={() => open()}>
                <FileUpload />
              </div>
            )}
          </div>
        )}
      </CldUploadWidget>
    </>
  );
};

export default MediaUploader;
