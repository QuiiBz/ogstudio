"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { OgEditor } from "./OgEditor";

export function Editor() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const imageId = searchParams.get("i");

  // If there isn't any image id, redirect to the images page
  if (!imageId) {
    router.push("/my-images");
    return null;
  }

  return <OgEditor height={630} imageId={imageId} width={1200} />;
}
