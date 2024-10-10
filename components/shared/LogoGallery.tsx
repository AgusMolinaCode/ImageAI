"use client";
import React, { useState } from "react";
import { getCldOgImageUrl } from "next-cloudinary";
import Image from "next/image";
import Header from "./Header";

import LogoCustomizationForm from "./LogoCustomizationForm";

interface LogoGalleryProps {
  logos: Array<{
    _id: string;
    title: string;
    publicId: string;
    secureURL: string;
    width: number;
    height: number;
  }>;
}

const LogoGallery: React.FC<LogoGalleryProps> = ({ logos }) => {
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  const [overlayText, setOverlayText] = useState<string>("Venta");
  const [textPosition, setTextPosition] = useState<string>("north_east");
  const [logoPosition, setLogoPosition] = useState<string>("south_east");

  function onSubmit(values: {
    texto: string;
    logo: string;
    posicionTexto: string;
    posicionLogo: string;
  }) {
    setOverlayText(values.texto);
    setSelectedLogo(values.logo);
    setTextPosition(values.posicionTexto);
    setLogoPosition(values.posicionLogo);
  }

  const imageUrl = getCldOgImageUrl({
    src: "imageai/fosbhfi8ijduelnwio7u",
    width: 700,
    height: 700,
    overlays: [
      {
        width: 700,
        crop: "fit",
        text: {
          color: "black",
          fontFamily: "Montserrat",
          fontSize: 80,
          fontWeight: "bold",
          text: overlayText,
        },
        position: {
          x: 10,
          y: 10,
          gravity: textPosition,
        },
      },
      {
        publicId: selectedLogo || "imageai/wklqvw90fg38tluyhola",
        width: 100,
        height: 100,
        position: {
          x: 10,
          y: 10,
          gravity: logoPosition,
        },
      },
    ],
  });

  return (
    <>
      <Header
        title="Customize your image"
        subtitle="Add your logo to the image"
      />
      <div className="flex flex-col md:flex-row justify-center gap-4 my-8">
        <div className="w-full md:w-1/2">
          <Image
            width={700}
            height={700}
            src={imageUrl}
            alt="Imagen Principal"
            className="w-[700px] h-[700px] object-cover"
          />
        </div>
        <LogoCustomizationForm logos={logos} onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default LogoGallery;
