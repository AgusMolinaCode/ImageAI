import React from "react";
import { getUserById } from "@/lib/actions/user.actions";
import { getUserLogos } from "@/lib/actions/logo.actions";
import { auth } from "@clerk/nextjs/server";
import LogoGallery from "@/components/shared/LogoGallery";

const page = async () => {
  const { userId } = auth();

  if (!userId) {
    return <div>Error: User ID is required</div>;
  }

  const user = await getUserById(userId);
  const images = await getUserLogos({ userId: user._id });
  
  
  return (
    <div>
      <LogoGallery logos={images?.data} />
    </div>
  );
};

export default page;