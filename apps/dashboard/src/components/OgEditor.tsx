import type { RefObject } from "react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { OGElement } from "../lib/types";
import { createElementId } from "../lib/elements";
import { maybeLoadFont } from "../lib/fonts";
import { Element } from './Element'
import { RightPanel } from "./RightPanel";
import { LeftPanel } from "./LeftPanel";
import { EditorToolbar } from "./EditorToolbar";

interface OgContextType {
  elements: OGElement[]
  selectedElement: string | null
  setSelectedElement: (id: string | null) => void
  setElements: (elements: OGElement[], skipEdit?: boolean) => void
  updateElement: (element: OGElement) => void
  addElement: (element: OGElement) => void
  removeElement: (id: string) => void
  undoRedo: (type: 'undo' | 'redo') => void
  rootRef: RefObject<HTMLDivElement>
}

export const OgContext = createContext<OgContextType | null>(null)

export function useOg() {
  const context = useContext(OgContext)

  if (!context) {
    throw new Error('useOg must be used within a OgProvider')
  }

  return context
}

interface OgProviderProps {
  initialElements: OGElement[]
  width: number
  height: number
}

const edits: OGElement[][] = []
let editIndex = -1

let elementToCopy: OGElement | undefined

export function OgEditor({ initialElements, width, height }: OgProviderProps) {
  const [selectedElement, setRealSelectedElement] = useState<string | null>(null)
  const [elements, setRealElements] = useState<OGElement[]>(() => {
    const item = typeof localStorage !== 'undefined' ? localStorage.getItem('elements') : undefined

    if (item) {
      return JSON.parse(item) as OGElement[]
    }

    return initialElements
  })
  const rootRef = useRef<HTMLDivElement>(null)

  const setSelectedElement = useCallback((id: string | null) => {
    const element = elements.find(item => item.id === id)

    // Don't allow selecting hidden elements
    if (element && !element.visible) {
      return
    }

    setRealSelectedElement(id)

    // Blur the currently focused DOM element (e.g. an input) when the user
    // edits an element
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }, [elements])

  const setElements = useCallback((newElements: OGElement[], skipEdit?: boolean) => {
    setRealElements(oldElements => {
      if (!skipEdit) {
        editIndex += 1
        edits[editIndex] = oldElements
      }

      return newElements
    })

    localStorage.setItem('elements', JSON.stringify(newElements))
  }, [])

  const updateElement = useCallback((element: OGElement) => {
    const index = elements.findIndex(item => item.id === element.id)

    if (index === -1) {
      return
    }

    const newElements = [...elements]
    newElements[index] = element

    if (!element.visible && element.id === selectedElement) {
      setSelectedElement(null)
    }

    if (element.tag === 'p' || element.tag === 'span') {
      maybeLoadFont(element.fontFamily, element.fontWeight)
    }

    setElements(newElements)
  }, [elements, setElements, setSelectedElement, selectedElement])

  const addElement = useCallback((element: OGElement) => {
    setElements([...elements, element])
    setSelectedElement(element.id)
  }, [elements, setElements, setSelectedElement])

  const removeElement = useCallback((id: string) => {
    const newElements = elements.filter(item => item.id !== id)
    setElements(newElements)
  }, [elements, setElements])

  const undoRedo = useCallback((type: 'undo' | 'redo') => {
    if (editIndex === -1) {
      return
    }

    if (type === 'undo') {
      editIndex -= 1
    } else {
      editIndex += 1
    }

    if (editIndex < 0) {
      editIndex = 0
    }

    if (editIndex > edits.length - 1) {
      editIndex = edits.length - 1
    }

    setElements(edits[editIndex], true)
  }, [setElements])

  /**
   * Immediately load fonts for elements that are visible on the page.
   */
  useEffect(() => {
    elements.forEach(element => {
      if (element.tag === 'p' || element.tag === 'span') {
        maybeLoadFont(element.fontFamily, element.fontWeight)
      }
    })
  }, [])

  useEffect(() => {
    function onContextMenu(event: MouseEvent) {
      event.preventDefault()
      // TODO
    }

    function onClick(event: MouseEvent) {
      const element = event.target as HTMLElement

      if (element.classList.contains('element') || element.classList.contains('handle') || element === rootRef.current) {
        return
      }

      setSelectedElement(null)
    }

    function onKeyDown(event: KeyboardEvent) {
      // If we're not focusing the body, don't do anything
      if (event.target !== document.body) {
        return
      }

      // Delete any selected element
      if ((event.key === 'Backspace' || event.key === 'Delete') && selectedElement) {
        event.preventDefault()
        removeElement(selectedElement)
      }

      // Unselect any selected element when pressing escape
      if (event.key === 'Escape' && selectedElement) {
        event.preventDefault()
        setSelectedElement(null)
      }

      // Undo
      if (event.key === 'z' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        undoRedo('undo')
      }

      // Redo
      if (event.key === 'Z' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        undoRedo('redo')
      }

      // Copy an element
      if (selectedElement && event.key === 'c' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        elementToCopy = elements.find(item => item.id === selectedElement)
      }

      // Paste a copied element
      if (event.key === 'v' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()

        if (elementToCopy) {
          addElement({
            ...elementToCopy,
            x: elementToCopy.x + 10,
            y: elementToCopy.y + 10,
            id: createElementId(),
          })
        }
      }
    }

    if (rootRef.current) {
      rootRef.current.addEventListener('contextmenu', onContextMenu)
      rootRef.current.addEventListener('click', onClick)
      document.addEventListener('keydown', onKeyDown)
    }

    return () => {
      if (rootRef.current) {
        rootRef.current.removeEventListener('contextmenu', onContextMenu)
        rootRef.current.removeEventListener('click', onClick)
        document.removeEventListener('keydown', onKeyDown)
      }
    }
  }, [rootRef, selectedElement, removeElement, addElement, elements, undoRedo, setSelectedElement])

  const value = useMemo(() => ({
    elements,
    selectedElement,
    setSelectedElement,
    setElements,
    updateElement,
    addElement,
    removeElement,
    undoRedo,
    rootRef,
  }), [elements, selectedElement, setSelectedElement, setElements, updateElement, addElement, removeElement, undoRedo])

  return (
    <OgContext.Provider value={value}>
      <div className="w-screen h-screen flex flex-row justify-between items-center bg-gray-50 overflow-hidden">
        <div className="w-[300px] h-screen flex flex-col border-r border-gray-100 shadow-lg shadow-gray-100 bg-white z-10">
          <LeftPanel />
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-xs text-gray-400 z-10">{width}x{height}</p>
          <div className="bg-white shadow-lg shadow-gray-100 relative" style={{ width, height }}>
            <div ref={rootRef} style={{ display: 'flex', width: '100%', height: '100%' }}>
              {elements.map(element => (
                <Element element={element} key={element.id} />
              ))}
            </div>
          </div>
          <div className="border border-gray-100 absolute pointer-events-none transform translate-y-[32px]" style={{ width, height }} />
          <EditorToolbar />
        </div>
        <div className="w-[300px] h-screen flex flex-col border-l border-gray-100 shadow-lg shadow-gray-100 bg-white z-10">
          <RightPanel />
        </div>
      </div>
    </OgContext.Provider>
  )
}
