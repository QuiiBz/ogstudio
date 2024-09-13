import { type FormEvent, startTransition, useState } from "react";
import {
  Text,
  Button,
  Flex,
  Dialog,
  Separator,
  TextField,
} from "@radix-ui/themes";
import { ArrowLeftIcon } from "../icons/ArrowLeftIcon";
import { type GenerateRequest } from "../../app/api/og/generate/route";
import { type OGElement } from "../../lib/types";
import { MagicWandIcon } from "../icons/MagicWandIcon";
import { Preview } from "./Preview";

export function AIGenerateModal() {
  const [elements, setElements] = useState<OGElement[]>([]);
  const [prompt, setPrompt] = useState<string>("");

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/og/generate", {
      method: "POST",
      body: JSON.stringify({
        prompt,
      } satisfies GenerateRequest),
    });

    if (!response.ok) {
      const error = ((await response.json()) as { error: string }).error;

      throw new Error(error);
    }

    const result = (await response.text())
      .replace("Here is the JSON representation of the elements:", "")
      .replaceAll("```", "")
      .replaceAll("\n", "");

    setElements(JSON.parse(result));
  };

  return (
    <>
      <Flex direction="column" gap="4">
        <Flex align="center" justify="between">
          <Text size="6">AI Generation</Text>
          <Dialog.Close>
            <Button color="gray" radius="full" variant="ghost">
              <ArrowLeftIcon />
              Continue editing
            </Button>
          </Dialog.Close>
        </Flex>
        <Text as="p" className="w-2/3" size="2">
          Generate an Open Graph image with the help of AI. Provide a prompt to
          describe the image you want to generate.
        </Text>
      </Flex>
      <form onSubmit={onSubmit}>
        <Flex gap="2" mt="6">
          <TextField.Root
            className="w-full"
            placeholder="Describe the image you want to generate..."
            onChange={(event) => {
              startTransition(() => {
                setPrompt(event.target.value);
              });
            }}
          />
          <Button type="submit" color="blue" size="2" variant="soft">
            <MagicWandIcon />
            Generate
          </Button>
        </Flex>
      </form>
      <Separator className="opacity-50" my="6" size="4" />
      <Preview
        dynamicTexts={{}}
        setDynamicTexts={() => {}}
        elements={elements}
      />
    </>
  );
}
