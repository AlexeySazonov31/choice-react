// import { useState } from "react";
// import PropTypes from "prop-types";
import "react";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

const items = ["Section1", "Section2", "Section3", "Section4", "Section5", "section6"];

// !!! props:
// items={items}
// onChange={selectResultEventHandler}
// spinning={spinning}
// wheelColor={wheelColor}
// fontColor={fontColor}

import "./index.css";
import { useEffect, useState } from "react";

// const isSpinning: boolean = false;

export function Spinner() {
    const [selectedItem, setSelectedItem] = useState<null | number>(null);
    const [isSpinning, setIsSpinning] = useState<string>("")

    const selectItem = () => {
      if (items.length === 0 || isSpinning ) {
        console.log("Can't spin a empty wheel or spinning wheel");
        return;
      }
      if (selectedItem === null) {
        const newSelectedItem = Math.floor(Math.random() * items.length);
        selectResultEventHandler();

        // if (this.props.onSelectItem) {
        //   this.props.onSelectItem(selectedItem);
        // }

        setSelectedItem(newSelectedItem);
      } else {
        setSelectedItem(null);
        setTimeout(selectItem, 500);
      }
    };

    function selectResultEventHandler() {
      if (items.length > 0 && !isSpinning ) {
        // const selectedIndex = num;

        // set this state to disable tab and wheel click when spinning
        setIsSpinning("spinning");

    setTimeout(
      () => {
        setIsSpinning("");
      },
      5 * 1000 // * duration
    );

    setTimeout(
      () => {
        // setWinners(winners.concat(items[selectedIndex]));
      },
      5 * 1000
    );
    setTimeout(
          () => {
          //   setOpenModal(true);
          },
          5 * 1000,
        );
      }
    }

    const wheelVars = {
      "--nb-item": items.length,
      "--selected-item": selectedItem,
    } as React.CSSProperties;
  // //   const spinning = selectedItem !== null ? "spinning" : "";
  useEffect(() => {
    if( selectedItem !== null ){
      setIsSpinning("spinning");
    } else {
      setIsSpinning("");
    }
  }, [selectedItem])
  //   setIsSpinning(selectedItem !== null ? true : false);

  const spinDuration = 5;

  // type cssPropertiesType = {
  //   "--spinning-duration"?: string
  //   "--wheel-color"?: string
  //   "--neutral-color"?: string
  // }

  const cssProperties = {
    "--spinning-duration": `${spinDuration}s`,
    "--wheel-color": `#000`,
    "--neutral-color": `#fff`,
  } as React.CSSProperties;

  //   cssProperties["--spinning-duration"] = `${spinDuration}s`;
  // //   cssProperties["--wheel-color"] = `${this.props.wheelColor}`;
  //   cssProperties["--wheel-color"] = `#000`;
  // // cssProperties["--neutral-color"] = `${this.props.fontColor}`;
  // cssProperties["--neutral-color"] = `#fff`;

  if (cssProperties["--wheel-color"] === "null")
    cssProperties["--wheel-color"] = "#d38c12";

  if (cssProperties["--neutral-color"] === "null")
    cssProperties["--neutral-color"] = "#FFFFFF";

  return (
    <>
      <div style={cssProperties}>
        <h1 className="text-center">Click to spin</h1>
        <div className="wheel-container">
          <div
            // lg={true}
            className={`wheel ${isSpinning}`}
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
