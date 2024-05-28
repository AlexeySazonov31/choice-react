// import "react";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

const initialTextareaValue = "Item 1\nItem 2\nItem 3\nItem 4";
const spinDuration = 8;

import { useOutletContext } from "react-router-dom";
import { usePrevious } from "../../hooks";
import "./spinner.css";
import React, { Dispatch, useState } from "react";

export function Spinner() {
  const [selectedItem, setSelectedItem] = useState<null | number>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [textareaValue, setTextareaValue] =
    useState<string>(initialTextareaValue);
  const prevSelectedItem = usePrevious(selectedItem);

  const items = textareaValue.split("\n").filter(str => /\w+/.test(str));

  const [showModalSpinnerOpt, setShowModalSpinnerOpt]: [
    boolean,
    Dispatch<boolean>,
  ] = useOutletContext();

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
      }, spinDuration * 1000);

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
    "--initial-item": prevSelectedItem ? prevSelectedItem : 0,
  } as React.CSSProperties;

  const spinningCssClass =
    selectedItem === null ? "" : isSpinning ? "spinning" : "preview";

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
        data-active={showModalSpinnerOpt}
        className="invisible data-[active=true]:visible opacity-0 data-[active=true]:opacity-100 transition-opacity"
      >
        <div
          data-active={showModalSpinnerOpt}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setShowModalSpinnerOpt(false)}
        >
          <div
            className="relative mx-auto my-6 w-11/12 sm:w-3/4 md:w-2/3 max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/*content*/}
            <div className="relative flex w-full flex-col rounded-lg border border-zinc-800 bg-zinc-900 shadow-lg outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-center justify-between rounded-t border-b border-solid border-zinc-800 p-5">
                <h3 className="text-2xl font-semibold text-zinc-100">
                  Select options
                </h3>
                <button
                  className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-white opacity-50 transition-opacity hover:opacity-80"
                  onClick={() => setShowModalSpinnerOpt(false)}
                >
                  <span className="block h-auto w-auto bg-transparent fill-white text-2xl text-white outline-none focus:outline-none">
                    &#x2715;
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="p-6 text-zinc-100">
                <textarea
                  className="max-h-96 min-h-38 w-full rounded border border-zinc-800 bg-zinc-900 p-3 outline-none placeholder:text-zinc-700 focus:outline-zinc-800"
                  rows={5}
                  value={textareaValue}
                  onChange={(e) => setTextareaValue(e.target.value)}
                  minLength={3}
                />
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end rounded-b border-t border-solid border-zinc-800 p-6">
                <button
                  className="mb-1 mr-1 rounded bg-emerald-700 px-6 py-3 text-sm font-semibold uppercase text-white transition-colors duration-150 hover:bg-emerald-800 active:bg-emerald-600"
                  type="button"
                  onClick={() => setShowModalSpinnerOpt(false)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed inset-0 z-40 bg-black opacity-60"></div>
      </div>

      <div
        style={cssProperties}
        className="grid h-full"
      >
        <h1 className="pt-5 text-center text-xl text-white">Click to spin</h1>
        <div className="wheel-container mb-20 justify-self-center">
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
