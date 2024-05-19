import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { useImagesStore } from "../stores/imagesStore";

export function EditorTitle() {
  const images = useImagesStore((state) => state.images);
  const selectedImageId = useImagesStore((state) => state.selectedImageId);
  const updateImage = useImagesStore((state) => state.updateImage);
  const selectedImage = images.find((image) => image.id === selectedImageId);
  const [isEditing, setIsEditing] = useState(false);

  if (!selectedImage) {
    return null;
  }

  function onSubmit(newName: string) {
    updateImage({
      id: selectedImage?.id ?? "",
      name: newName,
    });

    setIsEditing(false);
  }

  return (
    <Box
      className="transform -translate-x-1/2"
      left="50%"
      p="6"
      position="absolute"
      top="0"
    >
      <Flex gap="4" align="center">
        <Button
          size="2"
          color="gray"
          type="button"
          variant="ghost"
          onDoubleClick={(event) => {
            if (isEditing) {
              return;
            }

            event.preventDefault();
            setIsEditing(true);
          }}
        >
          {isEditing ? (
            <TextField.Root
              className="w-full elementNameInput"
              defaultValue={selectedImage.name}
              onBlur={(event) => {
                onSubmit(event.currentTarget.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === "Escape") {
                  event.currentTarget.blur();
                }
              }}
              size="1"
              // eslint-disable-next-line -- Usability and accessibility for users is not reduced here
              autoFocus
            />
          ) : (
            selectedImage.name
          )}
        </Button>
        <Text as="p" size="1">
          (1200x630)
        </Text>
      </Flex>
    </Box>
  );
}
