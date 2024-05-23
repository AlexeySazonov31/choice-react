import { useEffect, useState } from "react";
import videoBg1 from "../../assets/videos/1.mp4";
import videoBg2 from "../../assets/videos/2.mp4";
import videoBg3 from "../../assets/videos/3.mp4";
import videoBg4 from "../../assets/videos/4.mp4";
import videoBg5 from "../../assets/videos/5.mp4";
import videoBg6 from "../../assets/videos/6.mp4";
import videoBg7 from "../../assets/videos/7.mp4";
import videoBg8 from "../../assets/videos/8.mp4";
import videoBg9 from "../../assets/videos/9.mp4";
import videoBg10 from "../../assets/videos/10.mp4";

const videos = [
  videoBg1,
  videoBg2,
  videoBg3,
  videoBg4,
  videoBg5,
  videoBg6,
  videoBg7,
  videoBg8,
  videoBg9,
  videoBg10,
];

export function Home() {
  const [randomBoolean, setRandomBoolean] = useState<boolean>(
    Math.random() < 0.5,
  );

  const [currentVideoIndex, setCurrentVideoIndex] = useState(
    Math.floor(Math.random() * videos.length),
  );
  const changeVideo = () => {
    const randomNumber = Math.floor(Math.random() * videos.length);
    setCurrentVideoIndex(randomNumber);
  };
  const [videoLoad, setVideoLoad] = useState<boolean>(false);

  function handleChangeBoolean() {
    setRandomBoolean(Math.random() < 0.5);
  }
  useEffect(() => changeVideo(), []);

  return (
    <div
      className="flex h-full w-full items-center justify-center text-zinc-300"
      onClick={() => {
        setVideoLoad(false);
        handleChangeBoolean();
        changeVideo();
      }}
    >
      <>
        <video
          autoPlay
          muted
          loop
          src={videos[currentVideoIndex]}
          style={{
            opacity: videoLoad ? "0.3" : "0",
          }}
          onCanPlay={() => {
              setVideoLoad(true);
          }}
          className="absolute z-0 h-full w-full object-cover transition-all duration-500"
        />
        {videoLoad ? (
          <h1 className="z-10 select-none text-6xl uppercase animate-appear">
            {randomBoolean ? "yes" : "no"}
          </h1>
        ) : (
          <div className="z-10 flex flex-row gap-2">
            <div className="h-4 w-4 animate-bounce rounded-full bg-zinc-400"></div>
            <div className="h-4 w-4 animate-bounce rounded-full bg-zinc-400 [animation-delay:-.3s]"></div>
            <div className="h-4 w-4 animate-bounce rounded-full bg-zinc-400 [animation-delay:-.5s]"></div>
          </div>
        )}
      </>
    </div>
  );
}
