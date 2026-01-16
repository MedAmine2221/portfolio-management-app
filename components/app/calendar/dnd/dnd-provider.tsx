"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { CustomDragLayer } from "@/components/app/calendar/dnd/custom-drag-layer";
import { ChildrenProps } from "@/types/interfaces";

export function DndProviderWrapper({ children }: ChildrenProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      {children}
      <CustomDragLayer />
    </DndProvider>
  );
}
