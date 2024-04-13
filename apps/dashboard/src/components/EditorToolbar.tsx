import { Card, Flex, IconButton, Separator, Text } from "@radix-ui/themes";
import { createElement } from "../lib/elements";
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

  return (
    <Flex gap="4">
      <Card variant="classic">
        <Flex align="center" gap="4">
          <IconButton
            color="gray"
            onClick={() => {
              addElement(
                createElement({
                  tag: "p",
                  name: "Text",
                  width: 100,
                  height: 50,
                  visible: true,
                  rotate: 0,
                  blur: 0,
                  content: "Text",
                  color: "#000000",
                  fontFamily: "Inter",
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: 0,
                  fontSize: 50,
                  align: "left",
                }),
              );
            }}
            variant="ghost"
          >
            <TextIcon height="1.4em" width="1.4em" />
          </IconButton>
          <Separator orientation="vertical" />
          <IconButton
            color="gray"
            onClick={() => {
              addElement(
                createElement({
                  tag: "div",
                  name: "Box",
                  width: 200,
                  height: 200,
                  visible: true,
                  rotate: 0,
                  blur: 0,
                  radius: 0,
                  backgroundColor: "#000000",
                }),
              );
            }}
            variant="ghost"
          >
            <BoxIcon height="1.4em" width="1.4em" />
          </IconButton>
          <Separator orientation="vertical" />
          <IconButton
            color="gray"
            onClick={() => {
              addElement(
                createElement({
                  tag: "div",
                  name: "Rounded box",
                  width: 150,
                  height: 150,
                  visible: true,
                  rotate: 0,
                  blur: 0,
                  backgroundColor: "#000000",
                  radius: 999,
                }),
              );
            }}
            variant="ghost"
          >
            <CircleIcon height="1.4em" width="1.4em" />
          </IconButton>
          <Separator orientation="vertical" />
          <IconButton
            color="gray"
            onClick={() => {
              addElement(
                createElement({
                  tag: "div",
                  name: "Image",
                  width: 200,
                  height: 150,
                  visible: true,
                  rotate: 0,
                  blur: 0,
                  radius: 0,
                  backgroundColor: "#000000",
                  backgroundImage: "https://source.unsplash.com/random",
                  backgroundSize: "cover",
                }),
              );
            }}
            variant="ghost"
          >
            <ImageIcon height="1.4em" width="1.4em" />
          </IconButton>
          <Separator orientation="vertical" />
          <IconButton
            color="gray"
            onClick={() => {
              addElement(
                createElement({
                  tag: "span",
                  name: "Dynamic text",
                  width: 312,
                  height: 50,
                  visible: true,
                  rotate: 0,
                  blur: 0,
                  content: "dynamic",
                  color: "#000000",
                  fontFamily: "Inter",
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: 0,
                  fontSize: 50,
                  align: "left",
                }),
              );
            }}
            variant="ghost"
          >
            <MagicWandIcon height="1.4em" width="1.4em" />
          </IconButton>
        </Flex>
      </Card>
      <Card variant="classic">
        <Flex align="center" gap="4">
          <IconButton
            color="gray"
            onClick={() => {
              zoomOut();
            }}
            variant="ghost"
          >
            <ZoomOutIcon height="1.4em" width="1.4em" />
          </IconButton>
          <Separator orientation="vertical" />
          {/* Set absolute width to make sure it doesn't change the layout */}
          <Text align="center" className="select-none min-w-[40px]" size="1">
            {zoom}%
          </Text>
          <Separator orientation="vertical" />
          <IconButton
            color="gray"
            onClick={() => {
              zoomIn();
            }}
            variant="ghost"
          >
            <ZoomInIcon height="1.4em" width="1.4em" />
          </IconButton>
        </Flex>
      </Card>
    </Flex>
  );
}
