"use client";;
import { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { Calendar, Clock, User } from "lucide-react";
import { Button as HerouiButton } from "@heroui/button";
import { Input } from "@heroui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcnUI/ui/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventSchema } from "@/schema/calendar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shadcnUI/ui/select";
import { db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { getTemplateMail } from "@/lib/utils";

interface IProps {
  children: React.ReactNode;
}
export function AddEventDialog({ children }: IProps) {
  const clientsList = useSelector((state: RootState) => state.clients.clients);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const clientOptions = useMemo(() => {
    return clientsList.map((item) => ({
      key: String(item.id),
      label: item.firstName + " " + item.lastName,
    }));
  }, [clientsList]);
  
  const [start, setStart] = useState(new Date().toISOString());
  const [end, setEnd] = useState(new Date().toISOString());

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(eventSchema),
  });

  const onSubmit = async (data: any) => {    
    if (!selectedClient) {
      alert("select client");
      return;
    }

    try {
      const eventRef = collection(
        db,
        "contact",
        selectedClient,
        "events"
      );

      await addDoc(eventRef, {
        startDate: data.startDate,
        endDate: data.endDate,
        progress: "to do",
        createdAt: new Date().toISOString(),
      });      
      const selectedClientInfo = clientsList.find((item: any)=> item?.id === selectedClient);      
      const template = getTemplateMail({data: {
        client: selectedClientInfo?.firstName + " " + selectedClientInfo?.lastName,
        date: data.startDate,
        startDate: data.startDate,
        object: selectedClientInfo?.object,
        lientMeet: "https//:www.google.com"
      }});
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: selectedClientInfo?.email,
          subject: selectedClientInfo?.object,
          html: template
        })
      });

      alert("Event added successfuly");
    } catch (error) {
      console.error(error);
      alert("error whene adding event");
    }
  };

  return (
    <Dialog modal={true}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Client Select */}
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-1 font-medium text-sm">
              <User className="size-4" /> Client
            </label>
            <Select onValueChange={(val) => setSelectedClient(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {clientOptions.map((c) => (
                  <SelectItem key={c.key} value={c.key}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Start Date */}
          <div className="flex flex-col gap-1">
            <label className="flex items-center gap-1 font-medium text-sm">
              <Calendar className="size-4" /> Start Date
            </label>
            <Input
              {...register("startDate")}
              isInvalid={!!errors.startDate}
              errorMessage={errors.startDate?.message}
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
              isInvalid={!!errors.endDate}
              errorMessage={errors.endDate?.message}
              type="datetime-local"
              value={format(parseISO(end), "yyyy-MM-dd'T'HH:mm")}
              onChange={(e) => setEnd(new Date(e.target.value).toISOString())}
            />
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <HerouiButton type="submit">Save</HerouiButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
