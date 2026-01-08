"use server";
import { cookies } from "next/headers";

export const saveToken = async ({token}:any) =>{
    (await cookies())?.set("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
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

export const removeToken = async () => {
  const cookieStore = cookies();
  (await cookieStore).delete('token');
}