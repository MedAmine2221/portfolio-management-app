"use server";
import { cookies } from "next/headers";

export const saveToken = async ({token}:any) =>{
    (await cookies())?.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "strict",
    });
}

export const getToken = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get('token');
  const tokenValue = token?.value;
  return tokenValue;
}