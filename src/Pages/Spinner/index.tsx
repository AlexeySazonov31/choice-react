// import "react";
import { Modal } from "../../components";

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

  const items = textareaValue.split("\n").filter((str) => /\w+/.test(str));

  const [modal, setModal]: [
    { winner: string } | "items" | null,
    Dispatch<{ winner: string } | "items" | null>,
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

      setTimeout(() => {
        setModal({ winner: items[winner] });
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
      <Modal.Frame
        open={Boolean(modal)}
        onClose={() => {
          setModal(null);
        }}
      >
        <Modal.Head>
          {modal === "items" ? "Your choices" : "We have a winner!"}
        </Modal.Head>
        <Modal.Body>
          {modal === "items" ? (
            <textarea
              className="mt-1 max-h-96 min-h-36 w-full rounded border border-zinc-800 bg-zinc-900 p-3 outline-none placeholder:text-zinc-700 focus:outline-1 focus:outline-zinc-800"
              rows={5}
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              minLength={3}
            />
          ) : (
            <p className="text-center text-2xl font-bold text-zinc-100">
              {modal?.winner}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="flex items-center justify-end">
            <button
              className="background-transparent px-4 py-1 text-sm uppercase text-red-500 outline-none transition-colors duration-150 ease-linear hover:text-red-600 focus:outline-none active:text-red-700"
              type="button"
              onClick={() => setModal(null)}
            >
              Close
            </button>
            {modal !== "items" && (
              <button
                className="rounded border border-transparent px-4 py-2 text-sm uppercase text-blue-500 shadow outline-none transition-colors duration-150 ease-linear hover:border-blue-500 focus:outline-none active:text-blue-600"
                type="button"
                onClick={() => {
                  setTextareaValue(
                    items
                      .filter(str => str !== modal?.winner)
                      .join("\n")
                  );
                  setModal(null);
                }}
              >
                Remove
              </button>
            )}
          </div>
        </Modal.Footer>
      </Modal.Frame>

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
