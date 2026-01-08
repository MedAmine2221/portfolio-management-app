"use client";
import { auth } from "@/config/firebase";
import { clsx, type ClassValue } from "clsx";
import { sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { saveToken } from "./cookies-management";
import { setProfile } from "@/redux/profile/profileReducer";
import { Dispatch } from "@reduxjs/toolkit";

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

export const signIn = async (data: any, dispatch: any ,router: any) => {
  try {
    const { email, password } = data;

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const token = await user.getIdToken();
    await saveToken(token);

    if (!user.emailVerified) {
      await sendEmailVerification(user);
      alert("Verify your email please.");
      const interval = setInterval(async () => {
        await user.reload();
        if (user.emailVerified) {
          clearInterval(interval);
          dispatch(setProfile({uid: user.uid }))
          router.replace("/calendar/week-view");
        }
      }, 60000);

    } else {
      dispatch(setProfile({uid: user.uid }))
      router.replace("/calendar/week-view");
    }

  } catch (error: any) {
    console.error("Error signing in:", error.message);
    alert(error.message);
  }
};

//   try {

// const userCredential = await createUserWithEmailAndPassword(
//   auth,
//   data.email,
//   data.password
// );

// await sendEmailVerification(userCredential.user);  } catch (error) {
//     console.error(error);

//   }

// 1999@@BourawiPortfolioApp