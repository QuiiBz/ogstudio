import {
  Popover,
  Button,
  TextField,
  Flex,
  Badge,
  IconButton,
  Tooltip,
} from "@radix-ui/themes";
import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import { useFontsStore } from "../../stores/fontsStore";
import { useElementsStore } from "../../stores/elementsStore";
import { FontPreview } from "../FontPreview";
import type { OGElement } from "../../lib/types";
import { useDebounce } from "../../lib/hooks/useDebounce";
import { DEFAULT_FONTS } from "../../lib/fonts";
import { AddIcon } from "../icons/AddIcon";

interface FontSelectorProps {
  selectedElement: OGElement & { tag: "p" | "span" };
}

export function FontSelector({ selectedElement }: FontSelectorProps) {
  const { allFonts, installedFonts, installFont } = useFontsStore();
  const updateElement = useElementsStore((state) => state.updateElement);
  const fuse = useMemo(
    () => new Fuse(allFonts, { keys: ["name"] }),
    [allFonts],
  );
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 200);

  const searchedFonts = fuse
    .search(debouncedSearch)
    .slice(0, 8)
    .map(({ item }) => item.name);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <Tooltip content="Add font">
          <IconButton size="2" variant="soft" color="gray">
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Popover.Trigger>
      <Popover.Content width="300px">
        <Flex gap="3" direction="column">
          <TextField.Root
            placeholder="Search any fontsource font..."
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <Flex gap="1" direction="column">
            {searchedFonts.map((font) => (
              <Button
                variant="soft"
                color="gray"
                key={font}
                onClick={() => {
                  installFont(font);
                  const weights = allFonts.find(
                    ({ name }) => name === font,
                  )?.weights;

                  updateElement({
                    ...selectedElement,
                    fontFamily: font,
                    fontWeight: weights?.includes(selectedElement.fontWeight)
                      ? selectedElement.fontWeight
                      : 400,
                  });

                  setIsOpen(false);
                }}
              >
                <FontPreview font={font} />
                {DEFAULT_FONTS.includes(font) ? (
                  <Badge color="blue">Pre-installed</Badge>
                ) : installedFonts.has(font) ? (
                  <Badge color="green">Installed</Badge>
                ) : null}
              </Button>
            ))}
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
