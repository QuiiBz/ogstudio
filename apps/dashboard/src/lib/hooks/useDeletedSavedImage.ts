import { type DeleteRequest } from "../../app/api/og/delete/route";
import { type OGImage } from "../../stores/imagesStore";
import { useIsSignedIn } from "./useIsSignedIn";
import { useUser } from "./useUser";

export function useDeletedSavedImage() {
  const isSignedIn = useIsSignedIn();
  const { refetch } = useUser();

  return async function deleteImage(image: OGImage) {
    if (!isSignedIn) {
      return;
    }

    await fetch(`/api/og/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: image.id } satisfies DeleteRequest),
    });
    await refetch();
  };
}
