import { type OGImage, useImagesStore } from "../../stores/imagesStore";
import { type OGElement } from "../types";
import { useIsSignedIn } from "./useIsSignedIn";
import { useUser } from "./useUser";

export function useSavedImages() {
  const { images } = useImagesStore();
  const { data } = useUser();
  const savedImages = data && "images" in data ? data.images : [];
  const isSignedIn = useIsSignedIn();

  return [
    ...images
      .filter((image) => {
        return !savedImages.some((i) => {
          const [, id] = i.id.split(":");
          return image.id === id;
        });
      })
      .map((image) => ({
        ...image,
        elements: JSON.parse(
          localStorage.getItem(image.id) ?? "[]",
        ) as OGElement[],
        fromCloud: isSignedIn ? false : undefined,
      })),
    ...savedImages.map((image) => {
      const id = image.id.split(":")[1];

      if (!localStorage.getItem(id)) {
        localStorage.setItem(id, image.elements as string);
      }

      return {
        ...image,
        id,
        elements: JSON.parse(image.elements as string) as OGElement[],
        fromCloud: true,
      };
    }),
  ] as (OGImage & { elements: OGElement[]; fromCloud?: boolean })[];
}
