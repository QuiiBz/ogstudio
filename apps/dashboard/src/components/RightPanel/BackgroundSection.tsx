import {
  Grid,
  Text,
  Select,
  TextField,
  Flex,
  IconButton,
} from "@radix-ui/themes";
import type { OGElement } from "../../lib/types";
import { ColorIcon } from "../icons/ColorIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { StartIcon } from "../icons/StartIcon";
import { AddIcon } from "../icons/AddIcon";
import { EndIcon } from "../icons/EndIcon";
import { SquareIcon } from "../icons/SquareIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { useElementsStore } from "../../stores/elementsStore";

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
              <TextField.Root
                onChange={(event) => {
                  updateElement({
                    ...selectedElement,
                    backgroundColor: event.target.value,
                  });
                }}
                value={selectedElement.backgroundColor}
                variant="soft"
                color="gray"
                // @ts-expect-error wtf?
                type="color"
              >
                <TextField.Slot>
                  <ColorIcon />
                </TextField.Slot>
              </TextField.Root>
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
              <TextField.Root
                onChange={(event) => {
                  updateElement({
                    ...selectedElement,
                    // @ts-expect-error wtf?
                    gradient: {
                      ...selectedElement.gradient,
                      start: event.target.value,
                    },
                  });
                }}
                value={selectedElement.gradient.start}
                variant="soft"
                color="gray"
                // @ts-expect-error wtf?
                type="color"
              >
                <TextField.Slot>
                  <StartIcon />
                </TextField.Slot>
              </TextField.Root>
              <TextField.Root
                color="gray"
                onChange={(event) => {
                  updateElement({
                    ...selectedElement,
                    // @ts-expect-error wtf?
                    gradient: {
                      ...selectedElement.gradient,
                      end: event.target.value,
                    },
                  });
                }}
                value={selectedElement.gradient.end}
                variant="soft"
                // @ts-expect-error wtf?
                type="color"
              >
                <TextField.Slot>
                  <EndIcon />
                </TextField.Slot>
              </TextField.Root>
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
                <Select.Content>
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
                  <TextField.Slot>
                    <SquareIcon />
                  </TextField.Slot>
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
                    backgroundImage: "https://source.unsplash.com/random",
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
                <TextField.Slot>
                  <LinkIcon />
                </TextField.Slot>
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
                <Select.Content>
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
