"use client";;
import { useState } from "react";
import { Button as HerouiButton } from "@heroui/button";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/shadcnUI/ui/dialog";

interface IProps {
  children: React.ReactNode;
  action: ()=> void
}
const months = [
  "Jan",
  "Fév",
  "Mar",
  "Avr",
  "Mai",
  "Jun",
  "Jul",
  "Aoû",
  "Sep",
  "Oct",
  "Nov",
  "Déc",
];

export function DeleteEventDialog({ action, children }: IProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you wont to delete this event</DialogTitle>
        </DialogHeader>
        <DialogFooter className="mt-4 flex justify-end gap-2">
          <HerouiButton className="bg-white border-2 border-red-500 text-red-500" onPress={()=>setOpen(false)}>Cancel</HerouiButton>
          <HerouiButton 
            className="bg-red-500 text-white" 
            onPress={()=>{
                action();
                setOpen(false);
            }}
          >
            Delete
          </HerouiButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
