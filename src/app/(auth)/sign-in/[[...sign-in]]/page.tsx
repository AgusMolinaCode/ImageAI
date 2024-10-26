import React from "react";
import { SignIn } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";
import VideoPlayer from "@/components/shared/VideoPlayer";

const SignInPage = () => {
  return (
    <div className="flex justify-center mx-auto items-center min-h-screen gap-4">
      <div>
        <h1 className="text-center py-2 text-3xl md:text-6xl text-black font-bold">
          Image AI
        </h1>
        <h2 className="text-center py-5 text-lg md:text-xl text-gray-800 max-w-xl">
          Explore Image AI, including Generative Remove, Fill, Replace, Image
          Captioning, and more.
        </h2>
        <Separator className="bg-black/30" />
        <h2 className="text-center py-5 text-lg md:text-xl text-gray-800 max-w-xl">
          Customize your images, ideal for e-commerce. Add logos to your images
          and download them. Save different types of logos to use with your
          images.
        </h2>
        <div className="grid grid-cols-2 gap-2">
          <VideoPlayer
            src="https://cloudinary-marketing-res.cloudinary.com/video/upload/w_990,c_scale/f_auto,q_auto/v1691096151/AI-Video_Generative-Fill_2400x1600.mp4"
            width={280}
            height={280}
          />
          <VideoPlayer
            src="https://cloudinary-marketing-res.cloudinary.com/video/upload/w_990,c_scale/f_auto,q_auto/v1691093579/AI-Video_Generative-Remove_1200x800.mp4"
            width={280}
            height={280}
          />
          <VideoPlayer
            src="https://cloudinary-marketing-res.cloudinary.com/video/upload/w_990,c_scale/f_auto,q_auto/v1691107031/AI-Video_Generative-Replace_2280x1600.mp4"
            width={280}
            height={280}
          />
          <VideoPlayer
            src="https://cloudinary-marketing-res.cloudinary.com/video/upload/w_990,c_scale/f_auto:video,q_auto/v1687476294/AI-Video_Generative-Replace.mp4"
            width={280}
            height={280}
          />
          <VideoPlayer
            src="https://cloudinary-marketing-res.cloudinary.com/video/upload/f_auto/q_auto/v1694638105/AI-Generative-Restore.mp4"
            width={400}
            height={400}
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
