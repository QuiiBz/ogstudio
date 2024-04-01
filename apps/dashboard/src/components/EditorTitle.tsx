import { Box, Text } from "@radix-ui/themes";
import { useImagesStore } from "../stores/imagesStore";

export function EditorTitle() {
  const images = useImagesStore((state) => state.images);
  const selectedImageId = useImagesStore((state) => state.selectedImageId);
  const selectedImage = images.find((image) => image.id === selectedImageId);

  if (!selectedImage) {
    return null;
  }

  return (
    <Box
      className="transform -translate-x-1/2"
      left="50%"
      p="6"
      position="absolute"
      top="0"
    >
      <Text as="p" size="1">
        {selectedImage.name} (1200x630)
      </Text>
    </Box>
  );
}
