import React from "react";
import { getUserById } from "@/lib/actions/user.actions";
import { getUserLogos } from "@/lib/actions/logo.actions";
import { auth } from "@clerk/nextjs/server";
import CustomizationGallery from "@/components/shared/CustomizationGallery";
import { getUserMyImages } from "@/lib/actions/image.actions";

const page = async () => {
  const { userId } = auth();

  if (!userId) {
    return <div>Error: User ID is required</div>; 
  }

  const user = await getUserById(userId);
  const logos = await getUserLogos({ userId: user._id });
  const images = await getUserMyImages({ userId: user._id });

  return (
    <div>
      <CustomizationGallery logos={logos?.data} images={images?.data} />
    </div>
  );
};

export default page;
