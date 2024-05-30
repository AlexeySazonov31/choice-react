import { useEffect, useState } from "react";

import videoBg1 from "../../assets/videos/1.mp4"; // * no
import videoBg2 from "../../assets/videos/2.mp4"; // * yes
// import videoBg3 from "../../assets/videos/3.mp4"; // * 
// import videoBg4 from "../../assets/videos/4.mp4"; // * 
import videoBg5 from "../../assets/videos/5.mp4"; // * no
import videoBg6 from "../../assets/videos/6.mp4"; // * yes
import videoBg7 from "../../assets/videos/7.mp4"; // * yes
import videoBg8 from "../../assets/videos/8.mp4"; // * no
// import videoBg9 from "../../assets/videos/9.mp4"; // * 
import videoBg10 from "../../assets/videos/10.mp4"; // * yes
import videoBg11 from "../../assets/videos/11.mp4"; // * no
// import videoBg12 from "../../assets/videos/12.mp4"; // * 
import videoBg13 from "../../assets/videos/13.mp4"; // * no
import videoBg14 from "../../assets/videos/14.mp4"; // * yes
import videoBg15 from "../../assets/videos/15.mp4"; // * yes
import videoBg16 from "../../assets/videos/16.mp4"; // * yes
import videoBg17 from "../../assets/videos/17.mp4"; // * no
// import videoBg18 from "../../assets/videos/18.mp4"; // * 
import videoBg19 from "../../assets/videos/19.mp4"; // * yes
import videoBg20 from "../../assets/videos/20.mp4"; // * no

const videos = {
  yes: [videoBg2, videoBg6, videoBg7, videoBg10, videoBg14, videoBg15, videoBg16, videoBg19],
  no: [videoBg1, videoBg5, videoBg11, videoBg13, videoBg17, videoBg20, videoBg8],
};

export function Binary() {
  const [randomBoolean, setRandomBoolean] = useState<boolean>(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number | null>(
    null,
  );
  const [show, setShow] = useState<boolean>(false);

  function handleChange() {
    setShow(false);
    setTimeout(() => {
      const newRandomBoolean = Math.random() < 0.5;
      const randomNumber = getRandomInteger(0, videos[newRandomBoolean ? "yes" : "no"].length);
      setCurrentVideoIndex(randomNumber);
      setRandomBoolean(newRandomBoolean);
    }, 300);
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
            opacity: show ? "0.5" : "0",
          }}
          onCanPlay={() => {
            setTimeout(() => {
              setShow(true);
            }, 600);
          }}
          className="absolute z-0 h-full w-full object-cover transition-opacity duration-300"
        />
        {show ? (
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
