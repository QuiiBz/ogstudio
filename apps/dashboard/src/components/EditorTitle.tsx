import { useImagesStore } from "../stores/imagesStore";

export function EditorTitle() {
  const images = useImagesStore((state) => state.images);
  const selectedImageId = useImagesStore((state) => state.selectedImageId);
  const selectedImage = images.find((image) => image.id === selectedImageId);

  if (!selectedImage) {
    return null;
  }

  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 p-6 flex gap-2">
      <p className="text-gray-600 text-xs">{selectedImage.name}</p>
      <p className="text-gray-600 text-xs">(1200x630)</p>
    </div>
  );
}
