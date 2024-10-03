/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Collection } from "@/components/shared/Collection";
import { getAllImages } from "@/lib/actions/image.actions";
import { getCldOgImageUrl } from "next-cloudinary";
import Image from "next/image";

const imageUrl = getCldOgImageUrl({
  src: "imageai/xbdwclzkkfog1sdjb15k",
  width: 800,
  height: 800,
  overlays: [
    {
      width: 800,
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
      publicId: "imageai/dc30b1dd-ea1d-4f06-91c7-aa92afed96d2-removebg-preview_fubmwl",
      width: 180,
      height: 100,
      position: {
        x: 10,
        y: 10,
        gravity: "south_east",
      },
      
    }
  ],
  // removeBackground: true,
});

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";

  const images = await getAllImages({ page, searchQuery });

  return (
    <>
      <section className="">
        <h1 className="">Unleash Your Creative Vision with Imaginify</h1>
      </section>

      {/* <section className="sm:mt-12">
        <Collection 
        hasSearch={true}
        images={images?.data}
        totalPages={images?.totalPage}
        page={page}
        />
        </section> */}

      <Image
        src={imageUrl}
        width={800}
        height={800}
        alt="Picture of the author"
      />
    </>
  );
};

export default Home;
