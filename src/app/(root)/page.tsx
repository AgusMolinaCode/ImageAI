/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Collection } from "@/components/shared/Collection";
import { getAllImages } from "@/lib/actions/image.actions";
import { getCldOgImageUrl } from "next-cloudinary";
import Image from "next/image";
import LogoForm from "@/components/shared/LogoForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";

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
      publicId:
        "imageai/dc30b1dd-ea1d-4f06-91c7-aa92afed96d2-removebg-preview_fubmwl",
      width: 180,
      height: 100,
      position: {
        x: 10,
        y: 10,
        gravity: "south_east",
      },
    },
  ],
  // removeBackground: true,
});

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";

  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  // const images = await getAllImages({ page, searchQuery });

  return (
    <>
      
        <h1 className="text-7xl text-center mt-10 font-bold">Image AI</h1>
        <p className="text-center mt-5 text-2xl">Empowering your eCommerce with advanced image editing tools</p>
     

      {/* <section className="sm:mt-12">
        <Collection 
        hasSearch={true}
        images={images?.data}
        totalPages={images?.totalPage}
        page={page}
        />
        </section> */}

      {/* <Image
        src={imageUrl}
        width={800}
        height={800}
        alt="Picture of the author"
      /> */}

      {/* <LogoForm action="Add" userId={user._id} /> */}
    </>
  );
};

export default Home;
