import { create } from "zustand";
import { toast } from "sonner";
import { createJSONStorage, persist } from "zustand/middleware";
import { INITIAL_ELEMENTS, createElementId } from "../lib/elements";
import type { Template } from "../lib/templates";

export interface OGImage {
  name: string
  id: string
}

interface ImagesState {
  images: OGImage[]
  selectedImageId: string | null
  setSelectedImageId: (id: string | null) => void
  createEmptyImage: () => OGImage
  copyTemplate: (template: Template) => OGImage
  copyImage: (image: OGImage) => OGImage
  deleteImage: (image: OGImage) => void
}

export const useImagesStore = create(persist<ImagesState>(set => ({
  images: [],
  selectedImageId: null,
  setSelectedImageId: id => {
    set({ selectedImageId: id })
  },
  createEmptyImage: () => {
    const image: OGImage = {
      name: 'New Image',
      id: createElementId(),
    }

    localStorage.setItem(image.id, JSON.stringify(INITIAL_ELEMENTS))
    set(state => ({ images: [image, ...state.images] }))

    return image
  },
  copyTemplate: template => {
    const image: OGImage = {
      name: `Copy of ${template.name} template`,
      id: createElementId(),
    }

    localStorage.setItem(image.id, JSON.stringify(template.elements))
    set(state => ({ images: [image, ...state.images] }))

    return image
  },
  copyImage: image => {
    const newImage: OGImage = {
      name: `Copy of ${image.name}`,
      id: createElementId(),
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we copy an existing image
    localStorage.setItem(newImage.id, localStorage.getItem(image.id)!)
    set(state => ({ images: [newImage, ...state.images] }))

    toast('Image duplicated!')
    return newImage
  },
  deleteImage: image => {
    const deletedElements = localStorage.getItem(image.id) || '[]'
    localStorage.removeItem(image.id)
    set(state => ({ images: state.images.filter(({ id }) => id !== image.id) }))

    toast('Image deleted!', {
      action: {
        label: 'Undo',
        onClick: () => {
          localStorage.setItem(image.id, deletedElements)
          set(state => ({ images: [image, ...state.images] }))

          toast('Image restored!')
        }
      },
    })
  }
}), {
  name: 'images',
  storage: createJSONStorage(() => localStorage)
}))
