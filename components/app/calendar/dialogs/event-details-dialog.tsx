"use client";;
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Calendar, Clock, Text, User } from "lucide-react";

import { Button } from "@/components/shadcnUI/ui/button";
import { Button as HerouiButton } from "@heroui/button";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcnUI/ui/dialog";

import type { IEvent } from "@/types/interfaces";
import { Input } from "@heroui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventSchema } from "@/schema/calendar";
import { useForm } from "react-hook-form";

interface IProps {
  event: IEvent;
  children: React.ReactNode;
}

export function EventDetailsDialog({ event, children }: IProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const startDate = parseISO(event.startDate);
  const endDate = parseISO(event.endDate);

  const [start, setStart] = useState(event.startDate);
  const [end, setEnd] = useState(event.endDate);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(eventSchema),
    //   defaultValues: {
    //     startDate: parseISO(event.startDate),
    //     endDate: parseISO(event.endDate),
    // },
  });
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{event.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <User className="mt-1 size-4 shrink-0" />
              <div>
                <p className="text-sm font-medium">Client</p>
                <p className="text-sm text-muted-foreground">{event.user.name}</p>
              </div>
            </div>

            {isEditOpen ? 
            (
              <form onSubmit={handleSubmit(()=>alert("hiiiiii"))}>
                <div className="flex flex-col gap-1">
                  <label className="flex items-center gap-1 font-medium text-sm">
                    <Calendar className="size-4" /> Start Date
                  </label>
                  <Input
                    {...register("startDate")}
                    isInvalid={!!errors["startDate"]}
                    errorMessage={errors["startDate"]?.message}
                    type="datetime-local"
                    value={format(parseISO(start), "yyyy-MM-dd'T'HH:mm")}
                    onChange={(e) => setStart(new Date(e.target.value).toISOString())}
                  />
                </div>
      
                {/* End Date */}
                <div className="flex flex-col gap-1">
                  <label className="flex items-center gap-1 font-medium text-sm">
                    <Clock className="size-4" /> End Date
                  </label>
                  <Input
                    {...register("endDate")}
                    isInvalid={!!errors["endDate"]}
                    errorMessage={errors["endDate"]?.message}
                    type="datetime-local"
                    value={format(parseISO(end), "yyyy-MM-dd'T'HH:mm")}
                    onChange={(e) => setEnd(new Date(e.target.value).toISOString())}
                  />
                </div>
                {
                isEditOpen &&
                  <>
                    <div className="flex items-start gap-2">
                      <Text className="mt-1 size-4 shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Description</p>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                    </div>
                    <DialogFooter className="mt-4 flex justify-end gap-2">
                      <HerouiButton variant="bordered" onPress={()=> setIsEditOpen(false)}>Cancel</HerouiButton>
                      <HerouiButton type="submit">Save</HerouiButton>
                    </DialogFooter>
                  </>
                }
              </form>
            ):(
              <>
                <div className="flex items-start gap-2">
                  <Calendar className="mt-1 size-4 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Start Date</p>
                    <p className="text-sm text-muted-foreground">{format(startDate, "MMM d, yyyy h:mm a")}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="mt-1 size-4 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">End Date</p>
                    <p className="text-sm text-muted-foreground">{format(endDate, "MMM d, yyyy h:mm a")}</p>
                  </div>
                </div>
              </>
            )}
            {!isEditOpen && <div className="flex items-start gap-2">
              <Text className="mt-1 size-4 shrink-0" />
              <div>
                <p className="text-sm font-medium">Description</p>
                <p className="text-sm text-muted-foreground">{event.description}</p>
              </div>
            </div>}
          </div>

          {!isEditOpen &&
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditOpen(true)}
            >
              Edit
            </Button>
          </DialogFooter>}
        </DialogContent>
      </Dialog>
    </>
  );
}
