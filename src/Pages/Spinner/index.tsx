// import "react";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

const items = [
  "Section1",
  "Section2",
  "Section3",
  "Section4",
  "Section5",
  "section6",
];
const spinDuration = 8;

import { usePrevious } from "../../hooks";
import "./spinner.css";
import React, { useState } from "react";

export function Spinner() {
  const [selectedItem, setSelectedItem] = useState<null | number>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const prevSelectedItem = usePrevious(selectedItem);

  const selectItem = () => {
    if (items.length === 0 || isSpinning === true) {
      console.log("Can't spin a empty wheel or spinning wheel");
      return;
    }
    const newSelectedItem = Math.floor(Math.random() * items.length);
    selectResultEventHandler(newSelectedItem);
    setSelectedItem(newSelectedItem);
  };

  function selectResultEventHandler(winner: number) {
    if (items.length > 0 && isSpinning !== true) {
      setIsSpinning(true);

      setTimeout(() => {
          setIsSpinning(false);
      }, spinDuration * 1000 );

      // TODO winner modal
      setTimeout(() => {
        //   setOpenModal(true);
        console.log("win: " + items[winner]);
      }, spinDuration * 1000);
    }
  }
  const wheelVars = {
    "--nb-item": items.length,
    "--selected-item": selectedItem,
    "--initial-item": prevSelectedItem ? prevSelectedItem : 0
  } as React.CSSProperties;

  const spinningCssClass = selectedItem === null ? "" : isSpinning ? "spinning" : "preview";

  const cssProperties = {
    "--spinning-duration": `${spinDuration}s`,
    "--wheel-color": `#000`,
    "--neutral-color": `#fff`,
  } as React.CSSProperties;

  if (cssProperties["--wheel-color"] === "null")
    cssProperties["--wheel-color"] = "#d38c12";

  if (cssProperties["--neutral-color"] === "null")
    cssProperties["--neutral-color"] = "#FFFFFF";

  return (
    <>
      <div
        style={cssProperties}
        className="grid h-full"
      >
        <h1 className="text-center text-xl text-white pt-5">Click to spin</h1>
        <div className="wheel-container justify-self-center mb-20">
          <div
            className={`wheel ${spinningCssClass}`}
            style={wheelVars}
            onClick={selectItem}
          >
            {items.map((item, index) => (
              <div
                className="wheel-item"
                key={index}
                style={{ "--item-nb": index }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Spinner.propTypes = { items: PropTypes.array.isRequired };
