import type { DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Flex, Text } from "@radix-ui/themes";
import { useElementsStore } from "../../stores/elementsStore";
import { ElementRow } from "./ElementRow";

export function ElementsSection() {
  const elements = useElementsStore((state) => state.elements);
  const setElements = useElementsStore((state) => state.setElements);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const oldIndex = elements.findIndex(
        (element) => element.id === active.id,
      );
      const newIndex = elements.findIndex((element) => element.id === over.id);

      const newElements = arrayMove(elements, oldIndex, newIndex);
      setElements(newElements);
    }
  }

  return (
    <Flex direction="column" gap="2">
      <Text size="1">Elements</Text>
      <Flex
        className="no-scrollbar overflow-y-scroll max-h-[calc(100vh-380px)]"
        direction="column-reverse"
      >
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext
            items={elements}
            strategy={verticalListSortingStrategy}
          >
            {elements.map((element) => (
              <ElementRow element={element} key={element.id} />
            ))}
          </SortableContext>
        </DndContext>
      </Flex>
    </Flex>
  );
}
