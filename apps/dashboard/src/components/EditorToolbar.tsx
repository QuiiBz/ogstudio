import {
  Card,
  Flex,
  IconButton,
  Separator,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { type MouseEvent } from "react";
import { createDefaultElement, type ElementType } from "../lib/elements";
import { useZoomStore } from "../stores/zoomStore";
import { useElementsStore } from "../stores/elementsStore";
import { TextIcon } from "./icons/TextIcon";
import { CircleIcon } from "./icons/CircleIcon";
import { ImageIcon } from "./icons/ImageIcon";
import { BoxIcon } from "./icons/BoxIcon";
import { MagicWandIcon } from "./icons/MagicWandIcon";
import { ZoomOutIcon } from "./icons/ZoomOutIcon";
import { ZoomInIcon } from "./icons/ZoomInIcon";

export function EditorToolbar() {
  const addElement = useElementsStore((state) => state.addElement);
  const { zoom, zoomIn, zoomOut } = useZoomStore();

  function addNewElement(
    event: MouseEvent<HTMLButtonElement>,
    type: ElementType,
  ) {
    // Un-focus the clicked button since we'll be focusing the new element
    event.currentTarget.blur();

    addElement(createDefaultElement(type));
  }

  return (
    <Flex gap="4">
      <Card variant="classic">
        <Flex align="center" gap="4">
          <Tooltip content="Text • T">
            <IconButton
              color="gray"
              onClick={(event) => {
                addNewElement(event, "text");
              }}
              variant="ghost"
            >
              <TextIcon height="1.4em" width="1.4em" />
            </IconButton>
          </Tooltip>
          <Separator orientation="vertical" />
          <Tooltip content="Box • B">
            <IconButton
              color="gray"
              onClick={(event) => {
                addNewElement(event, "box");
              }}
              variant="ghost"
            >
              <BoxIcon height="1.4em" width="1.4em" />
            </IconButton>
          </Tooltip>
          <Separator orientation="vertical" />
          <Tooltip content="Rounded Box • O">
            <IconButton
              color="gray"
              onClick={(event) => {
                addNewElement(event, "rounded-box");
              }}
              variant="ghost"
            >
              <CircleIcon height="1.4em" width="1.4em" />
            </IconButton>
          </Tooltip>
          <Separator orientation="vertical" />
          <Tooltip content="Image • I">
            <IconButton
              color="gray"
              onClick={(event) => {
                addNewElement(event, "image");
              }}
              variant="ghost"
            >
              <ImageIcon height="1.4em" width="1.4em" />
            </IconButton>
          </Tooltip>
          <Separator orientation="vertical" />
          <Tooltip content="Dynamic Text • D">
            <IconButton
              color="gray"
              onClick={(event) => {
                addNewElement(event, "dynamic-text");
              }}
              variant="ghost"
            >
              <MagicWandIcon height="1.4em" width="1.4em" />
            </IconButton>
          </Tooltip>
        </Flex>
      </Card>
      <Card variant="classic">
        <Flex align="center" gap="4">
          <Tooltip content="Zoom Out">
            <IconButton
              color="gray"
              onClick={() => {
                zoomOut();
              }}
              variant="ghost"
            >
              <ZoomOutIcon height="1.4em" width="1.4em" />
            </IconButton>
          </Tooltip>
          <Separator orientation="vertical" />
          {/* Set absolute width to make sure it doesn't change the layout */}
          <Text align="center" className="select-none min-w-[40px]" size="1">
            {zoom}%
          </Text>
          <Separator orientation="vertical" />
          <Tooltip content="Zoom In">
            <IconButton
              color="gray"
              onClick={() => {
                zoomIn();
              }}
              variant="ghost"
            >
              <ZoomInIcon height="1.4em" width="1.4em" />
            </IconButton>
          </Tooltip>
        </Flex>
      </Card>
    </Flex>
  );
}
