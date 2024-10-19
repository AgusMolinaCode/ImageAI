import LogoForm from "@/components/shared/LogoForm";
import { getUserLogos } from "@/lib/actions/logo.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";

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
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-9 xl:grid-cols-3 max-w-7xl items-center mx-auto px-1">
          {images?.data?.map((image: any) => (
            <li
              key={image.title}
              className="w-full rounded-[16px] border-2 border-purple-200/20 p-8 shadow-xl shadow-purple-200/20"
            >
              <div className="flex-start flex-col gap-3">
                <p className="font-bold mt-2 text-black">{image.title}</p>
                
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default page;