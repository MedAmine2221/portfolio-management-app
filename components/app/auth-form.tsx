"use client";;
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";
import loginSchema from "@/schema/auth";
import { useRouter } from "next/navigation";
export default function AuthForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema())
  });
  const[isPassword, setIsPassword]=useState(true);
  const router = useRouter();
  return (
    <form onSubmit={handleSubmit((data) => router.push("/calendar/week-view"))} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <label className={`${!!errors["email"] ? "text-red-300":"text-white"} font-medium mb-2`}>Email</label>
        <div className="relative">
          <Input
            {...register("email")}
            name="email"
            isInvalid={!!errors["email"]}
            errorMessage={errors["email"]?.message}
            placeholder="you@example.com"
            startContent={
              <FiMail className={`text-xl ${!!errors["email"] ? "text-red-300" : "text-white/60"} pointer-events-none flex-shrink-0`} />
            }
            type="email"
            classNames={{
              inputWrapper: `bg-white/20 backdrop-blur-sm border-2 ${!!errors["email"] ? "border-red-300" : "border-transparent"} data-[hover=true]:bg-white/25`,
              input: `text-white placeholder:${!!errors["email"] ? "text-red-300":"text-white/60"}`,
              errorMessage: "text-red-300 text-sm text-center"
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className={`${!!errors["password"] ? "text-red-300":"text-white"} font-medium mb-2`}>Password</label>
        <div className="relative">
          <Input
            {...register("password")}
            name="password"
            placeholder="**********"
            startContent={
              <FiLock className={`text-xl ${!!errors["password"] ? "text-red-300" : "text-white/60"} pointer-events-none flex-shrink-0`} />
            }
            endContent={
                isPassword ?
                    <FiEye onClick={()=>setIsPassword(!isPassword)} className="text-xl text-white/60 cursor-pointer flex-shrink-0" />
                    :
                    <FiEyeOff onClick={()=>setIsPassword(!isPassword)} className="text-xl text-white/60 cursor-pointer flex-shrink-0" />
            }
            isInvalid={!!errors["password"]}
            errorMessage={errors["password"]?.message}
            type={isPassword ? "password" : "text"}
            classNames={{
              inputWrapper: `bg-white/20 backdrop-blur-sm border-2 ${!!errors["password"] ? "border-red-300" : "border-transparent"} data-[hover=true]:bg-white/25`,
              input: `text-white placeholder:${!!errors["password"] ? "text-red-300":"text-white/60"}`,
              errorMessage: "text-red-300 text-sm text-center"
            }}
          />
        </div>
      </div>
      <Button 
        type="submit" 
        className="w-full text-base bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold py-6 hover:from-cyan-600 hover:to-purple-700 transition-all"
      >
        Sign In
      </Button>
    </form>
  );
}