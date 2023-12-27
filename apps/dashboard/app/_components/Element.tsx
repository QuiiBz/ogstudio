import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react"
import type { OGElement } from "../_lib/types"
import { useOg } from "./OgPlayground"

function hexToRgba(hex: string, alpha: number) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`;
}

interface ElementProps {
  element: OGElement
}

export function Element({ element }: ElementProps) {
  const elementRef = useRef<HTMLElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const { selectedElement, setSelectedElement, updateElement, removeElement } = useOg()

  const isSelected = selectedElement === element.id
  const Tag = element.tag

  useEffect(() => {
    if (isEditing && !isSelected) {
      elementRef.current?.blur()
    }

  }, [isEditing, isSelected])

  useEffect(() => {
    function onMouseDown(event: MouseEvent) {
      if (isEditing) {
        return
      }

      event.preventDefault();

      setSelectedElement(element.id)

      const target = event.target as HTMLElement
      const isResizer = target.parentElement?.classList.contains('element')

      const startX = event.clientX - target.offsetLeft
      const startY = event.clientY - target.offsetTop
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know it's not null
      const initialX = isResizer ? target.parentElement!.offsetLeft : target.offsetLeft
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know it's not null
      const initialY = isResizer ? target.parentElement!.offsetTop : target.offsetTop
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know it's not null
      const initialWidth = isResizer ? target.parentElement!.offsetWidth : target.offsetWidth
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know it's not null
      const initialHeight = isResizer ? target.parentElement!.offsetHeight : target.offsetHeight
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know it's not null
      const initialRotate = isResizer ? Number(target.parentElement!.style.transform.replace('rotate(', '').replace('deg)', '')) : 0

      let changed = false

      function onMouseMove(mouseMoveEvent: MouseEvent) {
        changed = true

        if (isResizer) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know it's not null
          const parent = target.parentElement!

          if (target.classList.contains('bottom-right')) {
            let width = mouseMoveEvent.clientX - startX
            let height = mouseMoveEvent.clientY - startY

            if (mouseMoveEvent.shiftKey) {
              // Snap to 1:1
              const ratio = initialWidth / initialHeight
              const newRatio = width / height

              if (newRatio > ratio) {
                height = width / ratio
              } else {
                width = height * ratio
              }
            }

            parent.style.width = `${width}px`
            parent.style.height = `${height}px`
          } else if (target.classList.contains('bottom-left')) {
            const x = initialX + mouseMoveEvent.clientX - startX
            const width = x === 0 ? initialWidth + (mouseMoveEvent.clientX - startX) : initialWidth - (mouseMoveEvent.clientX - startX)

            parent.style.width = `${width}px`
            parent.style.left = `${x}px`

            const height = mouseMoveEvent.clientY - startY
            parent.style.height = `${height}px`
          } else if (target.classList.contains('top-right')) {
            const width = mouseMoveEvent.clientX - startX
            parent.style.width = `${width}px`

            const y = initialY + mouseMoveEvent.clientY - startY
            const height = y === 0 ? initialHeight + (mouseMoveEvent.clientY - startY) : initialHeight - (mouseMoveEvent.clientY - startY)
            parent.style.height = `${height}px`
            parent.style.top = `${y}px`
          } else if (target.classList.contains('top-left')) {
            const x = initialX + mouseMoveEvent.clientX - startX
            const width = x === 0 ? initialWidth + (mouseMoveEvent.clientX - startX) : initialWidth - (mouseMoveEvent.clientX - startX)
            parent.style.width = `${width}px`
            parent.style.left = `${x}px`

            const y = initialY + mouseMoveEvent.clientY - startY
            const height = y === 0 ? initialHeight + (mouseMoveEvent.clientY - startY) : initialHeight - (mouseMoveEvent.clientY - startY)
            parent.style.top = `${y}px`
            parent.style.height = `${height}px`
          } else if (target.classList.contains('top-center')) {
            // Rotate based on offset from center of target
            const x = mouseMoveEvent.clientX - startX - (parent.offsetWidth / 2)
            const y = mouseMoveEvent.clientY - startY - (parent.offsetHeight / 2)
            let rotate = (Math.atan2(y, x) * 180 / Math.PI) + 90 + initialRotate

            if (mouseMoveEvent.shiftKey) {
              // Snap to 15 degree increments
              rotate = Math.round(rotate / 15) * 15
            }

            if (rotate < 0) {
              rotate += 360
            }

            if (rotate >= 360) {
              rotate -= 360
            }

            parent.style.transform = `rotate(${rotate}deg)`
          }
        } else {
          const x = mouseMoveEvent.clientX - startX
          const y = mouseMoveEvent.clientY - startY

          target.style.left = `${x}px`
          target.style.top = `${y}px`
        }
      }

      function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)

        if (!changed) {
          return
        }

        if (!isResizer) {
          const x = Number(target.style.left.replace('px', ''))
          const y = Number(target.style.top.replace('px', ''))

          updateElement({
            ...element,
            x,
            y,
          })
        } else {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know it's not null
          const parent = target.parentElement!
          const x = Number(parent.style.left.replace('px', ''))
          const y = Number(parent.style.top.replace('px', ''))
          const width = Number(parent.style.width.replace('px', ''))
          const height = Number(parent.style.height.replace('px', ''))
          const rotate = Number(parent.style.transform.replace('rotate(', '').replace('deg)', ''))

          updateElement({
            ...element,
            x,
            y,
            width,
            height,
            rotate,
          })
        }
      }

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }

    function onDoubleClick(event: MouseEvent) {
      event.preventDefault()

      const target = event.target as HTMLElement

      if (!target.className.includes('element')) {
        return
      }

      target.contentEditable = 'true'
      target.focus()
      setIsEditing(true)

      function onKeyDown(keyDownEvent: KeyboardEvent) {
        if (keyDownEvent.key === 'Enter' || keyDownEvent.key === 'Escape') {
          keyDownEvent.preventDefault()
          target.blur()
        }

        // TODO: prevent deleting spans
        // if (event.key === 'Backspace') {
        // }
      }

      function onBlur() {
        target.contentEditable = 'false'
        setIsEditing(false)

        updateElement({
          ...element,
          // @ts-expect-error wtf?
          content: target.innerText,
        })

        target.removeEventListener('blur', onBlur)
        target.removeEventListener('keydown', onKeyDown)
      }

      target.addEventListener('blur', onBlur)
      target.addEventListener('keydown', onKeyDown)
    }

    if (elementRef.current) {
      elementRef.current.addEventListener('mousedown', onMouseDown)

      if (element.tag === 'p') {
        elementRef.current.addEventListener('dblclick', onDoubleClick)
      }
    }

    return () => {
      if (elementRef.current) {
        elementRef.current.removeEventListener('mousedown', onMouseDown)
        elementRef.current.removeEventListener('dblclick', onDoubleClick)
      }
    }
  }, [element.tag, elementRef, isEditing, setSelectedElement, updateElement, removeElement, selectedElement, isSelected, element])

  const style = useMemo<CSSProperties>(() => {
    const boxShadows: string[] = []
    let textShadow: string | undefined

    if (element.border) {
      boxShadows.push(`0 0 0 ${element.border.width}px${element.border.style === 'inside' ? ' inset' : ''} ${element.border.color}`)
    }

    if (element.shadow) {
      if (element.tag === 'p' || element.tag === 'span') {
        textShadow = `${element.shadow.x}px ${element.shadow.y}px ${element.shadow.blur}px ${element.shadow.color}`
      } else {
        boxShadows.push(`${element.shadow.x}px ${element.shadow.y}px ${element.shadow.blur}px ${element.shadow.width}px ${element.shadow.color}`)
      }
    }

    let base: CSSProperties = {
      position: 'absolute',
      top: `${element.y}px`,
      left: `${element.x}px`,
      width: `${element.width}px`,
      height: `${element.height}px`,
      transform: element.rotate !== 0 ? `rotate(${element.rotate}deg)` : undefined,
      boxShadow: boxShadows.length ? boxShadows.join(', ') : undefined,
    }

    if (element.tag === 'p' || element.tag === 'span') {
      base = {
        ...base,
        color: hexToRgba(element.color, element.opacity),
        fontFamily: element.fontFamily,
        fontWeight: element.fontWeight,
        fontSize: `${element.fontSize}px`,
        lineHeight: element.lineHeight,
        textAlign: element.align,
        marginTop: 0,
        marginBottom: 0,
        textShadow,
      }
    }

    if (element.tag === 'div') {
      base = {
        ...base,
        display: 'flex',
        borderRadius: element.radius ? `${element.radius}px` : undefined,
        background: element.backgroundImage
          ? undefined
          : element.gradient
            ? element.gradient.type === 'radial'
              ? `radial-gradient(${element.gradient.start}, ${element.gradient.end})`
              : `linear-gradient(${element.gradient.angle}deg, ${element.gradient.start}, ${element.gradient.end})`
            : hexToRgba(element.backgroundColor, element.opacity),
        backgroundImage: element.backgroundImage ? `url(${element.backgroundImage})` : undefined,
        backgroundRepeat: element.backgroundImage ? 'no-repeat' : undefined, // TODO
        // backgroundPosition: element.backgroundImage ? 'center' : undefined, // TODO
        backgroundSize: element.backgroundImage
          ? element.backgroundSize === 'cover'
            ? 'auto 100%'
            : '100% 100%'
          : undefined,
      }
    }

    return Object.fromEntries(Object.entries(base).filter(([, value]) => value !== undefined));
  }, [element])

  if (!element.visible) {
    return null
  }

  return (
    <Tag
      className={`element cursor-default select-none !outline-blue-500 outline-1 outline-offset-[3px] hover:outline ${isSelected ? 'outline cursor-move' : ''} ${isEditing ? '!outline !cursor-text' : ''} ${element.tag === 'span' ? '!outline-dashed' : ''}`}
      // @ts-expect-error wtf?
      ref={elementRef}
      style={style}
    >
      {element.tag === 'p' ? element.content : null}
      {element.tag === 'span' ? '[dynamic text]' : null}
      {isSelected ? (
        <>
          <span className="handle top-left absolute w-2.5 h-2.5 rounded-full bg-white border border-blue-500" />
          <span className="handle top-right absolute w-2.5 h-2.5 rounded-full bg-white border border-blue-500" />
          <span className="handle bottom-left absolute w-2.5 h-2.5 rounded-full bg-white border border-blue-500" />
          <span className="handle bottom-right absolute w-2.5 h-2.5 rounded-full bg-white border border-blue-500" />
          <span className="handle top-center absolute w-2.5 h-2.5 rounded-full bg-white border border-blue-500" />
        </>
      ) : null}
    </Tag>
  )
}
