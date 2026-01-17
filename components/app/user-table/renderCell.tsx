import { NameAbreviation } from "@/lib/utils";
import { AppUser } from "@/types";
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { VerticalDotsIcon } from "./verticalDotsIcon";
import { FiCheckCircle, FiClock, FiPlay, FiRepeat, FiXCircle } from "react-icons/fi";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { updateClient } from "@/redux/clients/clientReducer";
import { AppDispatch } from "@/redux/store";

export const renderCell = (dispatch: AppDispatch, user: AppUser, columnKey: React.Key) => {
   const changeStatus = async (status: string) =>{
     try {
       const contactRef = doc(
         db,
         "contact",
         String(user.id),
       );
       await updateDoc(contactRef, {
         status: status
       });
     } catch (error) {
       console.error("Error updating status:", error);
     }finally {
       dispatch(updateClient({id: user.id, status: status}));
     }
   }
   switch (columnKey) {
     case "avatar":
       return (
         <div className="mr-4 rounded-full bg-default-100 border border-default-300 w-10 h-10 flex justify-center items-center">
           <p className="mx-2 text-xl font-bold text-default-600">
             {NameAbreviation(user.lastName, user.firstName)}
           </p>
         </div>
       );
     case "firstName":
       return user.firstName || "—";

     case "lastName":
       return user.lastName || "—";

     case "email":
       return user.email || "—";

     case "status":
       return (
         <div className={`flex justify-center items-center text-center rounded-2xl mx-2 text-base font-medium border 
           ${user.status === "Completed" ? "border-green-400" : user.status === "Cancelled" ? "border-red-400" : user.status === "In progress" ? "border-primary-400" : "border-warning-400"} 
           ${user.status === "Completed" ? "bg-green-200" : user.status === "Cancelled" ? "bg-red-200" : user.status === "In progress" ? "bg-primary-200" : "bg-warning-200"} 
           ${user.status === "Completed" ? "text-success-600" : user.status === "Cancelled" ? "text-danger-600" : user.status === "In progress" ? "text-primary-600" : "text-warning-600"}
         `}>
           <p className="mx-2 text-base">
             {user.status}
           </p>
         </div>
       );

     case "object":
       return user.object || "—";

     case "message":
       return user.message || "—";
     
     case "createdAt":
       return (
           <p className="mx-2 text-sm">
             {`${new Date(user.createdAt).getDay()}-${
                 new Date(user.createdAt).getMonth() + 1
               }-${new Date(user.createdAt).getFullYear()} at ${new Date(
                 user.createdAt,
               ).getHours()}:${new Date(user.createdAt).getMinutes()}`}
           </p>
       );

     case "actions":
       return (
         <Dropdown>
           <DropdownTrigger>
             <Button disabled={user.status === "Completed" || user.status === "Cancelled"} isIconOnly size="sm" variant="light">
               <VerticalDotsIcon />
             </Button>
           </DropdownTrigger>
           <DropdownMenu>
             {user.status !== "Waiting" ? (
               <DropdownItem onPress={() => changeStatus("Waiting")} key="waiting" startContent={<FiClock />}>
                 Waiting
               </DropdownItem>
             ) : null}

             {user.status !== "Negotiating" ? (
               <DropdownItem onPress={() => changeStatus("Negotiating")} key="negotiating" startContent={<FiRepeat />}>
                 Negotiating
               </DropdownItem>
             ) : null}

             {user.status !== "In progress" ? (
               <DropdownItem onPress={() => changeStatus("In progress")} key="progress" startContent={<FiPlay />}>
                 In progress
               </DropdownItem>
             ) : null}

             {user.status !== "Cancelled" ? (
               <DropdownItem
                 onPress={() => changeStatus("Cancelled")}
                 key="cancelled"
                 className="text-danger"
                 startContent={<FiXCircle />}
               >
                 Cancelled
               </DropdownItem>
             ) : null}

             {user.status !== "Completed" ? (
               <DropdownItem
                 onPress={() => changeStatus("Completed")}
               key="completed"
               className="text-success"
               startContent={<FiCheckCircle />}
             >
               Completed
             </DropdownItem>
             ) : null }
           </DropdownMenu>

         </Dropdown>
       );

     default:
       return user[columnKey as keyof AppUser] ?? "—";
   }
 };