/* eslint-disable @typescript-eslint/no-unused-expressions */
import { dataUrl, debounce, getImageSize } from "@/src/lib/utils";
import { CldImage } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

const TransformedImage = ({
  image,
  type,
  title,
  transformationConfig,
  isTransforming,
  setIsTransforming,
  hasDownload = false,
}: TransformedImageProps) => {
  const downloadHandler = () => {};

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">Transformed {title}</h2>

        {hasDownload && (
          <button
            onClick={downloadHandler}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            <Image src="/download.svg" alt="Download" width={20} height={20} />
          </button>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div>
          <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image?.publicId}
            alt="image"
            sizes={"(max-width: 767px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="media-uploader_cldImage"
            onLoad={() => {
              setIsTransforming && setIsTransforming(false);
            }}
            onError={() => {
              debounce(() => {
                setIsTransforming && setIsTransforming(false);
              }, 8000)();
            }}
            {...transformationConfig}
          />

          {isTransforming && <p>Transforming...</p>}
        </div>
      ) : (
        <div>Transform Image</div>
      )}
    </div>
  );
};

export default TransformedImage;
