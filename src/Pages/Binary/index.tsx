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

const videos = {
  yes: [videoBg6, videoBg7, videoBg8, videoBg9, videoBg10],
  no: [videoBg1, videoBg2, videoBg3, videoBg4, videoBg5],
};

export function Binary() {
  const [randomBoolean, setRandomBoolean] = useState<boolean>(true);
  const [videoLoad, setVideoLoad] = useState<boolean>(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number | null>(
    null,
  );

  function handleChange() {
    setVideoLoad(false);
    setTimeout(() => {
      const newRandomBoolean = Math.random() < 0.5;
      const randomNumber = getRandomInteger(0, videos[newRandomBoolean ? "yes" : "no"].length);
      setCurrentVideoIndex(randomNumber);
      setRandomBoolean(newRandomBoolean);
    }, 400);
  }

  useEffect(() => {
    handleChange();
  }, []);

  return (
    <div
      className="flex h-full w-full items-center justify-center text-zinc-300"
      onClick={handleChange}
    >
      <>
        <video
          autoPlay
          muted
          loop
          playsInline
          src={
            currentVideoIndex !== null
              ? videos[randomBoolean ? "yes" : "no"][currentVideoIndex]
              : undefined
          }
          style={{
            opacity: videoLoad ? "0.5" : "0",
          }}
          onCanPlay={() => {
            setVideoLoad(true);
          }}
          className="absolute z-0 h-full w-full object-cover transition-all duration-500"
        />
        {videoLoad ? (
          <h1 className="z-10 pb-20 animate-appear select-none text-7xl font-bold uppercase shadow-zinc-900 text-shadow">
            {randomBoolean ? "yes" : "no"}
          </h1>
        ) : (
          <div className="z-10 pb-20 flex flex-row gap-2">
            <div className="h-4 w-4 animate-bounce rounded-full bg-zinc-400"></div>
            <div className="h-4 w-4 animate-bounce rounded-full bg-zinc-400 [animation-delay:-.3s]"></div>
            <div className="h-4 w-4 animate-bounce rounded-full bg-zinc-400 [animation-delay:-.5s]"></div>
          </div>
        )}
      </>
    </div>
  );
}

const getRandomInteger = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min)) + min
}
