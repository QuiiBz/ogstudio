import { cloneElement, useState, useEffect } from "react";
import type { MouseEvent, ReactElement, ReactNode } from "react";

interface ModalChildrenProps {
  close: () => void;
}

interface ModalProps {
  action: ReactElement;
  children: ReactNode | ((props: ModalChildrenProps) => ReactNode);
}

export function Modal({ action, children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const clickableAction = cloneElement(action, {
    onClick: () => {
      setIsOpen(true);
    },
  });

  function maybeClose(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {clickableAction}
      {isOpen ? (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- todo
        <div
          className="w-screen h-screen bg-black/10 flex justify-center items-center absolute top-0 left-0 z-10"
          onClick={maybeClose}
        >
          <div className="p-8 rounded-md bg-white shadow-lg shadow-gray-200 w-[980px]">
            {typeof children === "function"
              ? children({
                  close: () => {
                    setIsOpen(false);
                  },
                })
              : children}
          </div>
        </div>
      ) : null}
    </>
  );
}
