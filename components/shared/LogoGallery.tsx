"use client";
import React from "react";
import { CldImage, getCldOgImageUrl } from "next-cloudinary";
import Image from "next/image";
import Header from "./Header";

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
          text: "Sale",
        },
        position: {
          x: 10,
          y: 10,
          gravity: "north_east",
        },
      },

      {
        publicId: "imageai/wklqvw90fg38tluyhola",
        width: 100,
        height: 100,
        position: {
          x: 10,
          y: 10,
          gravity: "south_east",
        },
      },
    ],
  });
  return (
    <>
      <Header
        title="Customize Your Image"
        subtitle="Add your logo to the image"
      />
      <div className="flex justify-center items-center mt-10">
        <div className="">
          <Image
            width={700}
            height={700}
            src={imageUrl}
            alt="Main Image"
            className="main-image"
          />
        </div>
        {/* {logos.map((logo) => (
        <div key={logo._id}>
          <CldImage
            width={200}
            height={200}
            src={logo.publicId}
            alt={logo.title}
            className="logo-image"
          />
          <p>{logo.title}</p>
        </div>
      ))} */}
      </div>
    </>
  );
};

export default LogoGallery;
