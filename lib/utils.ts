import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return (clsx(inputs))
}
export function NameAbreviation(lastName: string, firstName: string){
  const lastNameList = lastName.split(" ");
  const firstNameList = firstName.split(" ");
  const rsltLN = lastNameList.reduce((acc, current)=> acc + current[0] , "").toUpperCase()
  const rsltFN = firstNameList.reduce((acc, current)=> acc + current[0] , "").toUpperCase()
  const result = rsltLN+rsltFN
  return result;
} 