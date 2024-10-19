import LogoForm from "@/components/shared/LogoForm";
import { getUserLogos } from "@/lib/actions/logo.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import React from "react";

interface Image {
  _id: string;
  title: string;
  publicId: string;
  secureURL: string;
  width: number;
  height: number;
  author: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const page = async () => {
  const { userId } = auth();

  if (!userId) {
    return <div>Error: User ID is required</div>;
  }

  const user = await getUserById(userId);
  const images = await getUserLogos({ userId: user._id });

  return (
    <div>
      <LogoForm action="Add" userId={user._id} />

      <section>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-9 xl:grid-cols-4  items-center  px-1">
          {images?.data?.map((image: Image) => (
            <li
              key={image.title}
              className="w-full rounded-[16px] border-2 border-purple-200/20 p-2 shadow-xl shadow-purple-200/20"
            >
              <div className="flex flex-col gap-3">
                <p className="font-bold mt-2">{image.title}</p>
                <Image
                  src={image.secureURL}
                  alt={image.title}
                  width={300}
                  height={300}
                  className="rounded-xl mx-auto"
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default page;
