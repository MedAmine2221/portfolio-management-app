"use client";
import type { ChildrenProps, IEvent } from "@/types/interfaces";

import { useMemo, useState } from "react";
import { format, isValid } from "date-fns";
import { Calendar, Clock, Text, User } from "lucide-react";
import { Button as HerouiButton } from "@heroui/button";
import { Input } from "@heroui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";

import { eventSchema } from "@/schema/calendar";
import { db } from "@/config/firebase";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcnUI/ui/dialog";
import { Button } from "@/components/shadcnUI/ui/button";
import { getTemplateMail, updateMeetingLink } from "@/lib/utils";
import { sendMail } from "@/lib/server-functions";
import { SiGooglemeet } from "react-icons/si";
import { monthsList } from "@/constants";

export function EventDetailsDialog({ event, children }: ChildrenProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [start, setStart] = useState(
    () => event?.startDate || new Date().toISOString(),
  );
  const [end, setEnd] = useState(
    () => event?.endDate || new Date().toISOString(),
  );
  const [open, setOpen] = useState(false);
  const {
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      startDate: event?.startDate || new Date().toISOString(),
      endDate: event?.endDate || new Date().toISOString(),
    },
  });
  const resetForm = () => {
    const now = new Date().toISOString();

    reset({
      startDate: now,
      endDate: now,
    });
    clearErrors();
  };

  const onSubmit = async (data: any) => {
    try {
      if(event){
          const ancienne_date = `${new Date(event?.startDate).getDay()} ${monthsList[new Date(data.startDate).getMonth()]} ${new Date(event?.startDate).getFullYear()}`;
          const eventRef = doc(
          db,
          "contact",
          String(event?.user.id),
          "events",
          String(event?.id),
        );

        await updateDoc(eventRef, {
          startDate: data.startDate,
          endDate: data.endDate,
          lienMeet: "https//:www.google.com",
          updatedAt: new Date().toISOString(),
        });

        const template = getTemplateMail({
          data: {
            client: event?.user.name,
            date: `${new Date(data.startDate).getDay()} ${monthsList[new Date(data.startDate).getMonth()]} ${new Date(data.startDate).getFullYear()}`,
            startDate:
              new Date(data.startDate).getHours() +
              "h:" +
              new Date(data.startDate).getMinutes() +
              "min",
              object: event?.title,
            ancienne_date: ancienne_date,
            edit: true,
            lientMeet: "https//:www.google.com",
          },
        });
        await sendMail(
          {
            to: event?.user.email,
            subject: event?.title,
            html: template,
          }
        )
        setStart(data.startDate);
        setEnd(data.endDate);

        alert("Event updated successfully");
        setIsEditOpen(false);
        clearErrors();
      }
    } catch (error) {
      console.error(error);
      alert("Error updating event");
    } finally {
      resetForm();
      setOpen(false);
    }
  };

  const startDateObj = useMemo(() => {
    const d = new Date(start);

    return isValid(d) ? d : null;
  }, [start]);

  const endDateObj = useMemo(() => {
    const d = new Date(end);

    return isValid(d) ? d : null;
  }, [end]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{event?.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <User className="mt-1 size-4 shrink-0" />
              <div>
                <p className="text-sm font-medium">Client</p>
                <p className="text-sm text-muted-foreground">
                  {event?.user.name}
                </p>
              </div>
            </div>

            {isEditOpen ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-1">
                  <label htmlFor="startDate" className="flex items-center gap-1 font-medium text-sm">
                    <Calendar className="size-4" /> Start Date
                  </label>
                  <Input
                    errorMessage={errors.startDate?.message}
                    isInvalid={!!errors.startDate}
                    type="datetime-local"
                    value={
                      start ? format(new Date(start), "yyyy-MM-dd'T'HH:mm") : ""
                    }
                    onChange={(e) => {
                      const isoString = new Date(e.target.value).toISOString();

                      setStart(isoString);
                      setValue("startDate", isoString, {
                        shouldValidate: true,
                      });
                    }}
                  />
                </div>

                {/* End Date */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="endDate" className="flex items-center gap-1 font-medium text-sm">
                    <Clock className="size-4" /> End Date
                  </label>
                  <Input
                    errorMessage={errors.endDate?.message}
                    isInvalid={!!errors.endDate}
                    type="datetime-local"
                    value={
                      end ? format(new Date(end), "yyyy-MM-dd'T'HH:mm") : ""
                    }
                    onChange={(e) => {
                      const isoString = new Date(e.target.value).toISOString();

                      setEnd(isoString);
                      setValue("endDate", isoString, { shouldValidate: true });
                    }}
                  />
                </div>
                <HerouiButton onPress={async () => {                  
                  const info = (await updateMeetingLink({
                    eventId: event?.meetingGoogleId || "",
                    startDate: start,
                    endDate: end,
                  })) as any;
                }} className="bg-amber-500 text-white text-lg font-bold">
                  <SiGooglemeet size={20} />
                  Update Meeting Link
                </HerouiButton>
                {isEditOpen && (
                  <>
                    <div className="flex items-start gap-2">
                      <Text className="mt-1 size-4 shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Description</p>
                        <p className="text-sm text-muted-foreground">
                          {event?.description}
                        </p>
                      </div>
                    </div>
                    <DialogFooter className="mt-4 flex justify-end gap-2">
                      <HerouiButton
                        variant="bordered"
                        onPress={() => {
                          setIsEditOpen(false);
                          // Reset to original values
                          setStart(event?.startDate || new Date().toISOString());
                          setEnd(event?.endDate || new Date().toISOString());
                          setOpen(false);
                          clearErrors();
                        }}
                      >
                        Cancel
                      </HerouiButton>
                      <HerouiButton type="submit">Save</HerouiButton>
                    </DialogFooter>
                  </>
                )}
              </form>
            ) : (
              <>
                <div className="flex items-start gap-2">
                  <Calendar className="mt-1 size-4 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Start Date</p>
                    <p className="text-sm text-muted-foreground">
                      {startDateObj
                        ? format(startDateObj, "MMM d, yyyy h:mm a")
                        : "Invalid date"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="mt-1 size-4 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">End Date</p>
                    <p className="text-sm text-muted-foreground">
                      {endDateObj
                        ? format(endDateObj, "MMM d, yyyy h:mm a")
                        : "Invalid date"}
                    </p>
                  </div>
                </div>
              </>
            )}
            {!isEditOpen && (
              <div className="flex items-start gap-2">
                <Text className="mt-1 size-4 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-sm text-muted-foreground">
                    {event?.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {!isEditOpen && (
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditOpen(true)}
              >
                Edit
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
