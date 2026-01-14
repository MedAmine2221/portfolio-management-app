"use client";;
import { useMemo, useState } from "react";
import { Calendar, Clock, User } from "lucide-react";
import { Button as HerouiButton } from "@heroui/button";
import { Input } from "@heroui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { addDoc, collection } from "firebase/firestore";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcnUI/ui/dialog";
import { eventSchema } from "@/schema/calendar";
import { RootState } from "@/redux/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcnUI/ui/select";
import { db } from "@/config/firebase";
import { addMeetingLink, getTemplateMail } from "@/lib/utils";
import { getClientById, sendMail } from "@/lib/server-functions";
import { signIn, useSession } from "next-auth/react";
import { SiGooglemeet } from "react-icons/si";
interface IProps {
  children: React.ReactNode;
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

export function AddEventDialog({ children }: IProps) {
    const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    clearErrors,
    watch
  } = useForm({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    },
  });
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const clientsList = useSelector((state: RootState) => state.clients.clients);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const clientOptions = useMemo(() => {
    return clientsList.map((item: any) => ({
      key: String(item.id),
      label: item.firstName + " " + item.lastName,
    }));
  }, [clientsList]);
  const start = useMemo(() => {
    return watch("startDate")
  }, [watch("startDate")]);
  const end = useMemo(() => {
    return watch("endDate")
  }, [watch("endDate")]);


  const resetForm = () => {
    const now = new Date().toISOString();

    reset({
      startDate: now,
      endDate: now,
    });
    setSelectedClient(null);
    clearErrors();
  };

  const clientInfo = useMemo(async () => {
    let result: any = null;
    if (selectedClient) {
      result = await getClientById(selectedClient)
    }
    return {
      object: result?.object,
      message: result?.message,
      email: result?.email,
    };
  }, [selectedClient]);  
  const onSubmit = async (data: any) => {
    if (!selectedClient) {
      alert("select client");

      return;
    }
    try {
      const eventRef = collection(db, "contact", selectedClient, "events");
      await addDoc(eventRef, {
        startDate: data.startDate,
        endDate: data.endDate,
        progress: "to do",
        lientMeet: "https//:www.google.com",
        createdAt: new Date().toISOString(),
      });
      const selectedClientInfo: any = clientsList.find(
        (item: any) => item?.id === selectedClient,
      );
      const template = getTemplateMail({
        data: {
          client:
            selectedClientInfo?.firstName + " " + selectedClientInfo?.lastName,
          date: `${new Date(data.startDate).getDay()} ${months[new Date(data.startDate).getMonth()]} ${new Date(data.startDate).getFullYear()}`,
          startDate:
            new Date(data.startDate).getHours() +
            "h:" +
            new Date(data.startDate).getMinutes() +
            "min",
          object: selectedClientInfo?.object,
          lientMeet: "https//:www.google.com",
        },
      });
      await sendMail(
        {
          to: selectedClientInfo?.email,
          subject: selectedClientInfo?.object,
          html: template,
        }
      )

      alert("Event added successfuly");
    } catch (error) {
      console.error(error);
      alert("error whene adding event");
    } finally {
      resetForm();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Client Select */}
          <div className="flex flex-col gap-1">
            <label htmlFor="client" className="flex items-center gap-1 font-medium text-sm">
              <User className="size-4" /> Client
            </label>
            <Select
              value={selectedClient || undefined}
              onValueChange={(val) => setSelectedClient(val)}
            >
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
            <label htmlFor="startDate" className="flex items-center gap-1 font-medium text-sm">
              <Calendar className="size-4" /> Start Date
            </label>
            <Input
              errorMessage={errors.startDate?.message}
              isInvalid={!!errors.startDate}
              type="datetime-local"
              onChange={(e) => {
                const isoString = new Date(e.target.value).toISOString();

                setValue("startDate", isoString, { shouldValidate: true });
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
              onChange={(e) => {
                const isoString = new Date(e.target.value).toISOString();

                setValue("endDate", isoString, { shouldValidate: true });
              }}
            />
          </div>
            <HerouiButton onPress={async ()=> await addMeetingLink(
              {
                title: (await clientInfo).object || "",
                description: (await clientInfo).message || "",
                startDate: start,
                endDate: end,
                attendees: [
                  "amine.dev.lazreg@gmail.com",
                  (await clientInfo).email,
                ],
                session,
                signIn
              }
            )} className="bg-amber-500 text-white text-lg font-bold">
              <SiGooglemeet size={20} />
              Add Meeting Link
            </HerouiButton>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <HerouiButton type="submit">Save</HerouiButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}