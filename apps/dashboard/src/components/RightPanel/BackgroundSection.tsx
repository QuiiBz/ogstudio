import {
  Grid,
  Text,
  Select,
  TextField,
  Flex,
  IconButton,
  Tooltip,
} from "@radix-ui/themes";
import type { OGElement } from "../../lib/types";
import { DeleteIcon } from "../icons/DeleteIcon";
import { StartIcon } from "../icons/StartIcon";
import { AddIcon } from "../icons/AddIcon";
import { EndIcon } from "../icons/EndIcon";
import { SquareIcon } from "../icons/SquareIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { useElementsStore } from "../../stores/elementsStore";
import { ColorPicker } from "../ColorPicker";

interface BackgroundSectionProps {
  selectedElement: OGElement;
}

export function BackgroundSection({ selectedElement }: BackgroundSectionProps) {
  const updateElement = useElementsStore((state) => state.updateElement);

  if (selectedElement.tag !== "div") {
    return;
  }

  return (
    <Flex direction="column" gap="2">
      {!selectedElement.backgroundImage ? (
        <>
          {!selectedElement.gradient ? (
            <>
              <Text size="1">Background color</Text>
              <ColorPicker
                onChange={(backgroundColor) => {
                  updateElement({
                    ...selectedElement,
                    backgroundColor,
                  });
                }}
                value={selectedElement.backgroundColor}
              />
            </>
          ) : null}
          <Flex justify="between">
            <Text size="1">Background gradient</Text>
            {selectedElement.gradient ? (
              <IconButton
                color="gray"
                onClick={() => {
                  updateElement({
                    ...selectedElement,
                    gradient: undefined,
                  });
                }}
                size="1"
                variant="ghost"
              >
                <DeleteIcon />
              </IconButton>
            ) : (
              <IconButton
                color="gray"
                onClick={() => {
                  updateElement({
                    ...selectedElement,
                    gradient: {
                      start: "#000000",
                      end: "#FFFFFF",
                      angle: 90,
                      type: "linear",
                    },
                  });
                }}
                size="1"
                variant="ghost"
              >
                <AddIcon />
              </IconButton>
            )}
          </Flex>
          {selectedElement.gradient ? (
            <Grid columns="2" gap="2">
              <ColorPicker
                onChange={(start) => {
                  updateElement({
                    ...selectedElement,
                    // @ts-expect-error wtf?
                    gradient: {
                      ...selectedElement.gradient,
                      start,
                    },
                  });
                }}
                value={selectedElement.gradient.start}
              >
                <StartIcon />
              </ColorPicker>
              <ColorPicker
                onChange={(end) => {
                  updateElement({
                    ...selectedElement,
                    // @ts-expect-error wtf?
                    gradient: {
                      ...selectedElement.gradient,
                      end,
                    },
                  });
                }}
                value={selectedElement.gradient.end}
              >
                <EndIcon />
              </ColorPicker>
              <Select.Root
                onValueChange={(value) => {
                  updateElement({
                    ...selectedElement,
                    gradient: {
                      ...selectedElement.gradient,
                      // @ts-expect-error wtf?
                      type: value,
                    },
                  });
                }}
                value={selectedElement.gradient.type}
              >
                <Select.Trigger color="gray" variant="soft" />
                <Select.Content variant="soft">
                  <Select.Item value="linear">Linear</Select.Item>
                  <Select.Item value="radial">Radial</Select.Item>
                </Select.Content>
              </Select.Root>
              {selectedElement.gradient.type === "linear" ? (
                <TextField.Root
                  color="gray"
                  max={360}
                  min={-360}
                  onChange={(event) => {
                    updateElement({
                      ...selectedElement,
                      // @ts-expect-error wtf?
                      gradient: {
                        ...selectedElement.gradient,
                        angle: event.target.valueAsNumber,
                      },
                    });
                  }}
                  type="number"
                  value={selectedElement.gradient.angle}
                  variant="soft"
                >
                  <Tooltip content="Direction">
                    <TextField.Slot>
                      <SquareIcon />
                    </TextField.Slot>
                  </Tooltip>
                  <TextField.Slot>deg</TextField.Slot>
                </TextField.Root>
              ) : null}
            </Grid>
          ) : null}
        </>
      ) : null}
      {!selectedElement.gradient ? (
        <>
          <Flex justify="between">
            <Text size="1">Background image</Text>
            {selectedElement.backgroundImage ? (
              <IconButton
                color="gray"
                onClick={() => {
                  updateElement({
                    ...selectedElement,
                    backgroundImage: undefined,
                  });
                }}
                size="1"
                variant="ghost"
              >
                <DeleteIcon />
              </IconButton>
            ) : (
              <IconButton
                color="gray"
                onClick={() => {
                  updateElement({
                    ...selectedElement,
                    backgroundImage: "https://picsum.photos/200/150",
                    backgroundSize: "cover",
                  });
                }}
                size="1"
                variant="ghost"
              >
                <AddIcon />
              </IconButton>
            )}
          </Flex>
          {selectedElement.backgroundImage ? (
            <Grid columns="2" gap="2">
              <TextField.Root
                className="col-span-full"
                color="gray"
                onChange={(event) => {
                  updateElement({
                    ...selectedElement,
                    backgroundImage: event.target.value,
                  });
                }}
                value={selectedElement.backgroundImage}
                variant="soft"
              >
                <Tooltip content="URL or SVG content">
                  <TextField.Slot>
                    <LinkIcon />
                  </TextField.Slot>
                </Tooltip>
              </TextField.Root>
              <Select.Root
                onValueChange={(value) => {
                  updateElement({
                    ...selectedElement,
                    // @ts-expect-error wtf?
                    backgroundSize: value,
                  });
                }}
                value={selectedElement.backgroundSize}
              >
                <Select.Trigger color="gray" variant="soft" />
                <Select.Content variant="soft">
                  <Select.Item value="contain">Contain</Select.Item>
                  <Select.Item value="cover">Cover</Select.Item>
                </Select.Content>
              </Select.Root>
              {/* TODO: image position */}
              {/* Needs https://github.com/vercel/satori/pull/464 */}
              {/* <Select */}
              {/*   onChange={() => { */}
              {/*     updateElement(selectedElement); */}
              {/*   }} */}
              {/*   value="center" */}
              {/*   values={["center"]} */}
              {/* > */}
              {/*   <ImagePositionIcon /> */}
              {/* </Select> */}
            </Grid>
          ) : null}
        </>
      ) : null}
    </Flex>
  );
}
