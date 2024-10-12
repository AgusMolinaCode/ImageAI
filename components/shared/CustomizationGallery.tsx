"use client";
import React, { useState } from "react";
import { getCldOgImageUrl } from "next-cloudinary";
import Image from "next/image";
import Header from "./Header";
import CustomizationGalleryForm from "./CustomizationGalleryForm";

interface LogoGalleryProps {
  logos: Array<{
    _id: string;
    title: string;
    publicId: string;
    secureURL: string;
    width: number;
    height: number;
  }>;
  images: Array<{
    _id: string;
    title: string;
    publicId: string;
    secureURL: string;
    width: number;
    height: number;
  }>;
}

const CustomizationGallery: React.FC<LogoGalleryProps> = ({
  logos,
  images,
}) => {
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  const [overlayText, setOverlayText] = useState<string>("Venta");
  const [textPosition, setTextPosition] = useState<string>("north_east");
  const [logoPosition, setLogoPosition] = useState<string>("south_east");
  const [showText, setShowText] = useState<boolean>(true);
  const [showLogo, setShowLogo] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Modificar la función onSubmit para incluir la imagen seleccionada
  function onSubmit(values: {
    mostrarTexto: boolean;
    texto?: string;
    posicionTexto?: string;
    mostrarLogo: boolean;
    logo?: string;
    posicionLogo?: string;
    imagen?: string; // Agregar la imagen seleccionada
  }) {
    setShowText(values.mostrarTexto);
    setShowLogo(values.mostrarLogo);
    if (values.mostrarTexto && values.texto) {
      setOverlayText(values.texto);
      setTextPosition(values.posicionTexto || "north_east");
    }
    if (values.mostrarLogo && values.logo) {
      setSelectedLogo(values.logo);
      setLogoPosition(values.posicionLogo || "south_east");
    }
    setSelectedImage(values.imagen || null); // Guardar la imagen seleccionada
  }

  const imageUrl = getCldOgImageUrl({
    src: selectedImage || "imageai/fosbhfi8ijduelnwio7u",
    width: 700,
    height: 700,
    overlays: [
      ...(showText
        ? [
            {
              text: {
                color: "black",
                fontFamily: "Lato",
                fontSize: 60,
                fontWeight: "semibold",
                text: overlayText,
              },
              position: {
                x: 10,
                y: 10,
                gravity: textPosition,
              },
            },
          ]
        : []),
      ...(showLogo && selectedLogo
        ? [
            {
              publicId: selectedLogo || "Nike",
              width: 130,
              height: 110,
              position: {
                x: 10,
                y: 10,
                gravity: logoPosition,
              },
            },
          ]
        : []),
    ],
    underlay: "imageai/66_v0xkau",
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
        <CustomizationGalleryForm
          logos={logos}
          images={images}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
};

export default CustomizationGallery;