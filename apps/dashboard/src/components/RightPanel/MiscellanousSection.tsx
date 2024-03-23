import type { OGElement } from "../../lib/types";
import { Input } from "../forms/Input";
import { CornerIcon } from "../icons/CornerIcon";
import { OpacityIcon } from "../icons/OpacityIcon";
import { RotateIcon } from "../icons/RotateIcon";
import { useElementsStore } from "../../stores/elementsStore";
import { Button } from "../forms/Button";
import { MagicWandIcon } from "../icons/MagicWandIcon";
import { TextIcon } from "../icons/TextIcon";

interface MiscellanousSectionProps {
  selectedElement: OGElement;
}

export function MiscellanousSection({
  selectedElement,
}: MiscellanousSectionProps) {
  const updateElement = useElementsStore((state) => state.updateElement);

  return (
    <>
      <p className="text-xs text-gray-600">Miscellaneous</p>
      <div className="grid grid-cols-2 gap-2 w-full">
        <Input
          max={100}
          min={0}
          onChange={(value) => {
            updateElement({
              ...selectedElement,
              opacity: value,
            });
          }}
          suffix="%"
          type="number"
          value={selectedElement.opacity}
        >
          <OpacityIcon />
        </Input>
        <Input
          max={360}
          min={-360}
          onChange={(value) => {
            updateElement({
              ...selectedElement,
              rotate: value,
            });
          }}
          suffix="deg"
          type="number"
          value={selectedElement.rotate}
        >
          <RotateIcon />
        </Input>
        {selectedElement.tag === "p" ? (
          <Button
            className="col-span-full"
            icon={<MagicWandIcon />}
            onClick={() => {
              updateElement({
                ...selectedElement,
                tag: "span",
                content: selectedElement.content
                  .toLowerCase()
                  .replace(/\s/g, "-"),
                name:
                  selectedElement.name === "Text"
                    ? "Dynamic text"
                    : selectedElement.name,
              });
            }}
          >
            Turn into Dynamic text
          </Button>
        ) : null}
        {selectedElement.tag === "span" ? (
          <Button
            className="col-span-full"
            icon={<TextIcon />}
            onClick={() => {
              updateElement({
                ...selectedElement,
                tag: "p",
                name:
                  selectedElement.name === "Dynamic text"
                    ? "Text"
                    : selectedElement.name,
              });
            }}
          >
            Turn into normal text
          </Button>
        ) : null}
        {selectedElement.tag === "div" ? (
          <Input
            max={999}
            min={0}
            onChange={(value) => {
              updateElement({
                ...selectedElement,
                radius: value,
              });
            }}
            suffix="px"
            type="number"
            value={selectedElement.radius ?? 0}
          >
            <CornerIcon />
          </Input>
        ) : null}
      </div>
    </>
  );
}
