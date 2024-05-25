// import { useState } from "react";
// import PropTypes from "prop-types";

const items = ["Section 1", "Section 2", "Section 3", "Section 4", "Section 5"];

// !!! props:
// items={items}
// onChange={selectResultEventHandler}
// spinning={spinning}
// wheelColor={wheelColor}
// fontColor={fontColor}

import "./index.css";

// const isSpinning: boolean = false;

export function Spinner() {
  //   const [selectedItem, setSelectedItem] = useState<null | number>(null);
  //   const [isSpinning, setIsSpinning] = useState<boolean>(false)

  //   const selectItem = () => {
  //     if (items.length === 0 || isSpinning === true) {
  //       console.log("Can't spin a empty wheel or spinning wheel");
  //       return;
  //     }
  //     if (selectedItem === null) {
  //       const newSelectedItem = Math.floor(Math.random() * items.length);
  //       setSelectedItem(newSelectedItem);
  //       //   if (this.props.onSelectItem) {
  //       //     this.props.onSelectItem(selectedItem);
  //       //   }
  //       setSelectedItem(newSelectedItem);
  //     } else {
  //       setSelectedItem(null);
  //       setTimeout(selectItem, 5000);
  //     }
  //   };

  //   function selectResultEventHandler(data) {
  //     if (items.length > 0 && isSpinning !== true) {
  //       const selectedIndex = data;

  //       // set this state to disable tab and wheel click when spinning
  //       setIsSpinning(true);

  // when spinning disable update player
  //   document.getElementById("inputTextArea").disabled = true;
  //   document.getElementById("updateButton").disabled = true;
  //   document.getElementById("inputSearchBar").disabled = true;
  //   document.getElementById("shuffleButton").disabled = true;
  //   document.getElementById("removeButton").disabled = true;
  //   document.getElementById("clearListButton").disabled = true;

  // after done spinning enable update player
  //   setTimeout(
  //     () => {
  //       setSpinning(false);
  //       document.getElementById("inputTextArea").disabled = false;
  //       document.getElementById("updateButton").disabled = false;
  //       document.getElementById("inputSearchBar").disabled = false;
  //       document.getElementById("shuffleButton").disabled = false;
  //       document.getElementById("removeButton").disabled = false;
  //       document.getElementById("clearListButton").disabled = false;
  //     },
  //     window.localStorage.getItem("duration") * 1000,
  //   );

  //   setTimeout(
  //     () => {
  //       setWinners(winners.concat(items[selectedIndex]));
  //     },
  //     window.localStorage.getItem("duration") * 1000,
  //     //   );
  //       setTimeout(
  //         () => {
  //         //   setOpenModal(true);
  //         },
  //         5 * 1000,
  //       );
  //     }
  //   }

  //   const wheelVars = {
  //     "--nb-item": items.length,
  //     "--selected-item": selectedItem,
  //   };
  // //   const spinning = selectedItem !== null ? "spinning" : "";
  //   setIsSpinning(selectedItem !== null ? true : false);

  //   const spinDuration = 5;

  //   type cssPropertiesType = {
  //     "--spinning-duration"?: string
  //     "--wheel-color"?: string
  //     "--neutral-color"?: string
  //   }
  //   const cssProperties: cssPropertiesType = {};

  //   cssProperties["--spinning-duration"] = `${spinDuration}s`;
  // //   cssProperties["--wheel-color"] = `${this.props.wheelColor}`;
  //   cssProperties["--wheel-color"] = `#000`;
  // // cssProperties["--neutral-color"] = `${this.props.fontColor}`;
  // cssProperties["--neutral-color"] = `#fff`;

  //   if (cssProperties["--wheel-color"] === "null")
  //     cssProperties["--wheel-color"] = "#d38c12";

  //   if (cssProperties["--neutral-color"] === "null")
  //     cssProperties["--neutral-color"] = "#FFFFFF";

  return (
    <>
      <div 
    //   style={cssProperties}
      >
        {/* <h1 className="text-center">Click to spin</h1> */}
        <div className="wheel-container">
          <div
            // lg={true}
            // className={`wheel ${isSpinning}`}
            className={`wheel ${false}`}
            // style={wheelVars}
            // onClick={selectItem}
          >
            {items.map((item, index) => (
              <div
                className="wheel-item"
                key={index}
                // style={{ "--item-nb": index }}
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
