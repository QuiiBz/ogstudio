/* eslint-disable @typescript-eslint/no-non-null-assertion -- we know it's defined */
import { useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import type { OGElement } from "../lib/types";
import { createElementStyle, createImgElementStyle } from "../lib/elements";
import { useElementsStore } from "../stores/elementsStore";

interface ElementProps {
  element: OGElement;
}

export function Element({ element }: ElementProps) {
  const elementRef = useRef<HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const selectedElementsId = useElementsStore(
    (state) => state.selectedElementsId,
  );
  const setSelectedElementsId = useElementsStore(
    (state) => state.setSelectedElementsId,
  );
  const updateElements = useElementsStore((state) => state.updateElements);
  const removeElement = useElementsStore((state) => state.removeElement);

  const isSelected = selectedElementsId.includes(element.id);
  const Tag = element.tag;

  useEffect(() => {
    function onMouseDown(event: MouseEvent) {
      // Prevent dragging the element when editing text
      // or when not left-clicking
      if (isEditing || event.button !== 0) {
        return;
      }

      event.preventDefault();

      setSelectedElementsId(
        event.shiftKey ? [...selectedElementsId, element.id] : [element.id],
      );

      const target = event.target as HTMLElement;
      const isResizer = target.parentElement?.classList.contains("element");

      const startX = event.clientX - target.offsetLeft;
      const startY = event.clientY - target.offsetTop;

      const initialX = isResizer
        ? target.parentElement!.offsetLeft
        : target.offsetLeft;

      const initialY = isResizer
        ? target.parentElement!.offsetTop
        : target.offsetTop;

      const initialWidth = isResizer
        ? target.parentElement!.offsetWidth
        : target.offsetWidth;

      const initialHeight = isResizer
        ? target.parentElement!.offsetHeight
        : target.offsetHeight;

      const initialRotate = isResizer
        ? Number(
            target
              .parentElement!.style.transform.replace("rotate(", "")
              .replace("deg)", ""),
          )
        : 0;

      let changed = false;

      function onMouseMove(mouseMoveEvent: MouseEvent) {
        changed = true;

        // We want to resize / rotate
        if (isResizer) {
          const parent = target.parentElement!;

          if (target.classList.contains("bottom-right")) {
            let width = mouseMoveEvent.clientX - startX;
            let height = mouseMoveEvent.clientY - startY;

            if (mouseMoveEvent.shiftKey) {
              // Snap to 1:1
              const ratio = initialWidth / initialHeight;
              const newRatio = width / height;

              if (newRatio > ratio) {
                height = width / ratio;
              } else {
                width = height * ratio;
              }
            }

            parent.style.width = `${width}px`;
            parent.style.height = `${height}px`;
          } else if (target.classList.contains("bottom-left")) {
            const x = initialX + mouseMoveEvent.clientX - startX;
            const width =
              x === 0
                ? initialWidth + (mouseMoveEvent.clientX - startX)
                : initialWidth - (mouseMoveEvent.clientX - startX);

            parent.style.width = `${width}px`;
            parent.style.left = `${x}px`;

            const height = mouseMoveEvent.clientY - startY;
            parent.style.height = `${height}px`;
          } else if (target.classList.contains("top-right")) {
            const width = mouseMoveEvent.clientX - startX;
            parent.style.width = `${width}px`;

            const y = initialY + mouseMoveEvent.clientY - startY;
            const height =
              y === 0
                ? initialHeight + (mouseMoveEvent.clientY - startY)
                : initialHeight - (mouseMoveEvent.clientY - startY);
            parent.style.height = `${height}px`;
            parent.style.top = `${y}px`;
          } else if (target.classList.contains("top-left")) {
            const x = initialX + mouseMoveEvent.clientX - startX;
            const width =
              x === 0
                ? initialWidth + (mouseMoveEvent.clientX - startX)
                : initialWidth - (mouseMoveEvent.clientX - startX);
            parent.style.width = `${width}px`;
            parent.style.left = `${x}px`;

            const y = initialY + mouseMoveEvent.clientY - startY;
            const height =
              y === 0
                ? initialHeight + (mouseMoveEvent.clientY - startY)
                : initialHeight - (mouseMoveEvent.clientY - startY);
            parent.style.top = `${y}px`;
            parent.style.height = `${height}px`;
          } else if (target.classList.contains("top-center")) {
            // Rotate based on offset from center of target
            const x = mouseMoveEvent.clientX - startX - parent.offsetWidth / 2;
            const y = mouseMoveEvent.clientY - startY - parent.offsetHeight / 2;
            let rotate =
              (Math.atan2(y, x) * 180) / Math.PI + 90 + initialRotate;

            if (mouseMoveEvent.shiftKey) {
              // Snap to 15 degree increments
              rotate = Math.round(rotate / 15) * 15;
            }

            if (rotate < 0) {
              rotate += 360;
            }

            if (rotate >= 360) {
              rotate -= 360;
            }

            parent.style.transform = `rotate(${rotate}deg)`;
          }
        } else {
          // We want to move
          const x = mouseMoveEvent.clientX - startX;
          const y = mouseMoveEvent.clientY - startY;

          target.style.left = `${x}px`;
          target.style.top = `${y}px`;
        }
      }

      function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);

        if (!changed) {
          return;
        }

        if (isResizer) {
          const parent = target.parentElement!;
          const x = Number(parent.style.left.replace("px", ""));
          const y = Number(parent.style.top.replace("px", ""));
          const width = Number(parent.style.width.replace("px", ""));
          const height = Number(parent.style.height.replace("px", ""));
          const rotate = Number(
            parent.style.transform.replace("rotate(", "").replace("deg)", ""),
          );

          updateElements([
            {
              ...element,
              x,
              y,
              width,
              height,
              rotate,
            },
          ]);
        } else {
          const x = Number(target.style.left.replace("px", ""));
          const y = Number(target.style.top.replace("px", ""));

          updateElements([
            {
              ...element,
              x,
              y,
            },
          ]);
        }
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }

    function onDoubleClick(event: MouseEvent) {
      event.preventDefault();

      const target = event.target as HTMLElement;

      // Prevent double-clicking on resizers
      if (!target.className.includes("element")) {
        return;
      }

      target.contentEditable = "true";
      target.focus();
      setIsEditing(true);

      function onKeyDown(keyDownEvent: KeyboardEvent) {
        // Submit on enter or escape. The actual cleanup is done in the
        // onBlur event handler.
        if (keyDownEvent.key === "Enter" || keyDownEvent.key === "Escape") {
          keyDownEvent.preventDefault();
          target.blur();
        }

        // TODO: prevent deleting spans
        // if (event.key === 'Backspace') {
        // }
      }

      function onBlur() {
        target.contentEditable = "false";
        setIsEditing(false);

        updateElements([
          {
            ...element,
            // @ts-expect-error wtf?
            content: target.innerText,
          },
        ]);

        target.removeEventListener("blur", onBlur);
        target.removeEventListener("keydown", onKeyDown);
      }

      target.addEventListener("blur", onBlur);
      target.addEventListener("keydown", onKeyDown);
    }

    if (elementRef.current) {
      elementRef.current.addEventListener("mousedown", onMouseDown);

      if (element.tag === "p") {
        elementRef.current.addEventListener("dblclick", onDoubleClick);
      }
    }

    return () => {
      if (elementRef.current) {
        elementRef.current.removeEventListener("mousedown", onMouseDown);
        elementRef.current.removeEventListener("dblclick", onDoubleClick);
      }
    };
  }, [
    element.tag,
    elementRef,
    isEditing,
    setSelectedElementsId,
    updateElements,
    removeElement,
    selectedElementsId,
    isSelected,
    element,
  ]);

  const style = useMemo(() => createElementStyle(element), [element]);

  if (!element.visible) {
    return null;
  }

  return (
    <Tag
      className={clsx(
        "element cursor-default select-none !outline-blue-500 outline-1 outline-offset-[3px] hover:outline",
        { "outline cursor-move": isSelected },
        { "!outline !cursor-text": isEditing },
        { "!outline-dashed": element.tag === "span" },
      )}
      id={`element-${element.id}`}
      // @ts-expect-error wtf?
      ref={elementRef}
      style={style}
    >
      {element.tag === "p" ? element.content : null}
      {element.tag === "span" ? "[dynamic text]" : null}
      {element.tag === "div" && element.backgroundImage ? (
        <img
          alt=""
          src={element.backgroundImage}
          style={{
            pointerEvents: "none",
            ...createImgElementStyle(element),
            width: "100%",
            height: "100%",
          }}
        />
      ) : null}
      {/* suggestion: make multiple element manipulations? */}
      {isSelected && selectedElementsId.length === 1 ? (
        <>
          <span className="handle top-left absolute w-2.5 h-2.5 rounded-full bg-white border border-blue-500" />
          <span className="handle top-right absolute w-2.5 h-2.5 rounded-full bg-white border border-blue-500" />
          <span className="handle bottom-left absolute w-2.5 h-2.5 rounded-full bg-white border border-blue-500" />
          <span className="handle bottom-right absolute w-2.5 h-2.5 rounded-full bg-white border border-blue-500" />
          <span className="handle top-center absolute w-2.5 h-2.5 rounded-full bg-white border border-blue-500" />
        </>
      ) : null}
    </Tag>
  );
}
