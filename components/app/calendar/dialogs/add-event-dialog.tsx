"use client";;
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { Calendar, Clock, User } from "lucide-react";

import { Button as HerouiButton } from "@heroui/button";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/shadcnUI/ui/dialog";

import { Input } from "@heroui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventSchema } from "@/schema/calendar";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Select, SelectItem } from "@heroui/react";

interface IProps {
  children: React.ReactNode;
}

export function AddEventDialog({ children }: IProps) {
  const clientsList = useSelector((item: RootState)=> item.clients.clients);  
  const [start, setStart] = useState(new Date().toISOString());
  const [end, setEnd] = useState(new Date().toISOString());
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(eventSchema),
  });
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> Add New Event </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <form onSubmit={handleSubmit(()=>alert("hiiiiii"))}>
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-1 font-medium text-sm">
                  <User className="size-4" /> Client
                </label>
                <Select className="max-w-full mb-2" label="Select a client" size={"sm"}>
                  {clientsList.map((client) => (
                    <SelectItem key={client?.id}>{client?.firstName + " " + client?.lastName}</SelectItem>
                  ))}
                </Select>
              </div>
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
              <DialogFooter className="mt-4 flex justify-end gap-2">
                <HerouiButton type="submit">Save</HerouiButton>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
