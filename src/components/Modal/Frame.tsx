import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { getFocusableElements, nextFocus, usePortal } from "../../utils";
import useDetectKeyboardOpen from "use-detect-keyboard-open";

export const Frame: React.FC<{
  children: React.ReactNode;
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
  onClose: () => void;
  open?: boolean;
}> = ({
  children,
  closeOnClickOutside = true,
  closeOnEsc = true,
  onClose,
  open = true,
}) => {
  const portal = usePortal();
  const previousFocus = useRef<HTMLElement | null>(null);

  // close on click outside
  const container = useRef<HTMLDivElement>(null);
  const onOverlayClick = (e: React.MouseEvent) => {
    if (!container.current?.contains(e.target as Node)) onClose();
  };

  // close on esc
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case "Escape": {
          if (closeOnEsc) onClose();
          break;
        }
        case "Tab": {
          e.preventDefault();
          nextFocus(getFocusableElements(container.current), !e.shiftKey);
          break;
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeOnEsc, onClose, open]);

  useEffect(() => {
    // aria-hidden
    document
      .getElementById("root")
      ?.setAttribute("aria-hidden", open.toString());
    portal.current?.setAttribute("aria-hidden", (!open).toString());

    if (open) {
      previousFocus.current = (document.activeElement as HTMLElement) ?? null;
      nextFocus(getFocusableElements(container.current));
      container.current?.scrollIntoView();
    } else {
      previousFocus.current?.focus?.();
      previousFocus.current = null;
    }
  }, [open, portal]); // note: when importing, eslint doesn't recognise that portal is a ref, so it doesn't need to be in the deps array

  // scroll to modal if native keyboard is open
  const isKeyboardOpen = useDetectKeyboardOpen();
  useEffect(() => {
    if (isKeyboardOpen) {
      const unit = document.documentElement.scrollHeight / 100;
      scrollTo(0, 20 * unit);
    }
  }, [isKeyboardOpen]);

  return ReactDOM.createPortal(
    // transparent overlay: `inset-0` to stretch over the entire screen (combines`top-0`, `right-0`, `bottom-0`, and `left-0`)
    <div
      data-active={open}
      className={classNames(
        "fixed inset-0 z-10 animate-modal-frame-appear items-center justify-center bg-black/70 p-4 text-white backdrop-blur",
        `${open ? "visible flex" : "invisible hidden"}`, // control visibility via `open` attribute (or render conditionally)
      )}
      onClick={closeOnClickOutside ? onOverlayClick : undefined}
    >
      {/* container: `max - w - sm` to make it reasonably narrow, `mx - auto` to center horizontally */}
      <div
        className="relative mx-auto w-full max-w-md pb-10"
        ref={container}
      >
        {/* contents */}
        <div className="overflow-hidden rounded-lg bg-zinc-900 shadow-xl">
          {children}
        </div>
        {/* closer in the corner */}
        <button
          className="absolute -right-2 -top-2 flex h-8 w-8 cursor-pointer justify-center rounded border border-zinc-800 bg-zinc-900 shadow-xl outline-none transition-colors hover:bg-zinc-950 active:text-zinc-500"
          onClick={() => onClose()}
          title="close"
        >
          <span className="select-none text-2xl leading-7">&times;</span>
        </button>
      </div>
    </div>,
    portal.current,
  );
};
