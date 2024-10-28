import React from "react";
import { SignIn } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import VideoPlayer from "@/components/shared/VideoPlayer";
import { InfiniteSliderVertical } from "@/components/shared/InfiniteSliderVertical";

const SignInPage = () => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      <div className="flex flex-col justify-center mx-auto max-w-xl">
        <h1 className="text-center py-2 text-3xl md:text-6xl text-black font-bold">
          Image AI
        </h1>
        <h2 className="text-center py-3 text-md text-gray-600">
          Explore Image AI, including Generative Remove, Fill, Replace, Image
          Captioning, and more.
        </h2>
        <Separator className="bg-black/30" />
        <h2 className="text-center pt-3 pb-8 text-md text-gray-600">
          Customize your images, ideal for e-commerce. Add logos to your images
          and download them. Save different types of logos to use with your
          images.
        </h2>
      </div>
      <video
        poster="https://cloudinary-marketing-res.cloudinary.com/video/upload/c_scale,w_800/so_1,f_webp,q_auto/v1722958008/Cloudinary-Copperfield_072924_AMN-v2.mp4"
        muted
        autoPlay
        loop
        controls
        width={800}
        height={800}
        className="mx-auto rounded-sm md:rounded-xl"
      >
        <source
          src="https://cloudinary-marketing-res.cloudinary.com/video/upload/f_auto,q_auto,w_1080/v1722958008/Cloudinary-Copperfield_072924_AMN-v2.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="flex justify-center mx-auto items-center gap-10 py-28">
        <div>
          <div>
            <InfiniteSliderVertical />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
