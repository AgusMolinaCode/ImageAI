import { InfiniteSlider } from "../core/InfiniteSlider";
import VideoPlayer from "./VideoPlayer";

export function InfiniteSliderVertical() {
  return (
    <div className="flex h-[480px] space-x-4">
      <InfiniteSlider direction="vertical">
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
          src="https://cloudinary-marketing-res.cloudinary.com/video/upload/w_990,c_scale/f_auto,q_auto/v1691107031/AI-Video_Generative-Replace_2400x1600.mp4"
          width={280}
          height={280}
        />
      </InfiniteSlider>
      <InfiniteSlider direction="vertical" reverse>
        <VideoPlayer
          src="https://cloudinary-marketing-res.cloudinary.com/video/upload/w_990,c_scale/f_auto:video,q_auto/v1687476294/AI-Video_Generative-Replace.mp4"
          width={280}
          height={280}
        />
        <VideoPlayer
          src="https://cloudinary-marketing-res.cloudinary.com/video/upload/f_auto/q_auto/v1694638105/AI-Generative-Restore.mp4"
          width={280}
          height={280}
        />
        <VideoPlayer
          src="https://cloudinary-marketing-res.cloudinary.com/video/upload/v1722623260/gen-replace.mp4"
          width={280}
          height={280}
        />
      </InfiniteSlider>
    </div>
  );
}
