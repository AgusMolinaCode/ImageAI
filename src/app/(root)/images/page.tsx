import { Collection } from "@/components/shared/Collection";
import UserImageForm from "@/components/shared/UserImageForm";
import { getUserMyImages } from "@/lib/actions/image.actions";
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

const page = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;

  const { userId } = auth();

  if (!userId) {
    return <div>Error: User ID is required</div>;
  }

  const user = await getUserById(userId);
  const images = await getUserMyImages({ page,userId: user._id });

  return (
    <div>
      <UserImageForm action="Add" userId={user._id} />

      <section className="px-1">
        <h2 className="text-2xl font-bold mt-8 mb-4">My Logos</h2>
        <section className="mt-4 md:mt-8">
        <Collection
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
      </section>
    </div>
  );
};

export default page;
