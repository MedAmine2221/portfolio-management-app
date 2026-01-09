"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from "react";
import loginSchema from "@/schema/auth";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { Checkbox, CheckboxGroup } from "@heroui/react";
import { clearAuth, setAuth } from "@/redux/auth/authReducer";
export default function AuthForm() {
  const loading = useSelector((item: RootState)=> item?.loading?.loading);
  const auth = useSelector((item: RootState)=> item?.auth.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema()),
    defaultValues:{
      email: auth.email,
      password: auth.password,
    }
  });  
  const email = useMemo(()=>{
    return watch("email");
  },[
    watch("email")
  ])
  const password = useMemo(()=>{
    return watch("password");
  },[
    watch("password")
  ])
  const[isPassword, setIsPassword] = useState(true);
  const [remembred, setRemembred] = useState(false);
  useEffect(()=> {
    console.log(remembred);
    
    if(remembred){
      dispatch(setAuth({
        email: email,
        password: password,
        remember: true
      }))
    }else{
      dispatch(clearAuth())
    }
  },[remembred])
  const router = useRouter();
  const submit = (data: any) => {
    try{
      signIn({
        email: data.email,
        password: data.password
      },dispatch, router)  
    } catch(error){
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <label className={`${!!errors["email"] ? "text-red-300":"text-black"} font-medium mb-2`}>Email</label>
        <div className="relative">
          <Input
            {...register("email")}
            name="email"
            isInvalid={!!errors["email"]}
            errorMessage={errors["email"]?.message}
            placeholder="you@example.com"
            startContent={
              <FiMail className={`text-xl ${!!errors["email"] ? "text-red-300" : "text-black"} pointer-events-none flex-shrink-0`} />
            }
            type="email"
            classNames={{
              inputWrapper: `bg-white backdrop-blur-sm border-2 ${!!errors["email"] ? "border-red-300" : "border-black"} data-[hover=true]:bg-white/25`,
              input: `text-black placeholder:${!!errors["email"] ? "text-red-300":"text-black"}`,
              errorMessage: "text-red-300 text-sm text-center"
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className={`${!!errors["password"] ? "text-red-300":"text-black"} font-medium mb-2`}>Password</label>
        <div className="relative">
          <Input
            {...register("password")}
            name="password"
            placeholder="**********"
            startContent={
              <FiLock className={`text-xl ${!!errors["password"] ? "text-red-300" : "text-black"} pointer-events-none flex-shrink-0`} />
            }
            endContent={
                isPassword ?
                    <FiEye onClick={()=>setIsPassword(!isPassword)} className="text-xl text-black cursor-pointer flex-shrink-0" />
                    :
                    <FiEyeOff onClick={()=>setIsPassword(!isPassword)} className="text-xl text-black cursor-pointer flex-shrink-0" />
            }
            isInvalid={!!errors["password"]}
            errorMessage={errors["password"]?.message}
            type={isPassword ? "password" : "text"}
            classNames={{
              inputWrapper: `bg-white backdrop-blur-sm border-2 ${!!errors["password"] ? "border-red-300" : "border-black"} data-[hover=true]:bg-white/25`,
              input: `text-black placeholder:${!!errors["password"] ? "text-red-300":"text-black"}`,
              errorMessage: "text-red-300 text-sm text-center"
            }}
          />
        </div>
      </div>
      <Button
        disabled={loading}
        type="submit" 
        className="w-full text-base bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold py-6 hover:from-cyan-600 hover:to-purple-700 transition-all"
      >
        {loading ? "SigningIn..." : "Sign In"}
      </Button>
      <CheckboxGroup onChange={(prev)=>{
        setRemembred(!prev);
      }} color="primary">
        <Checkbox isSelected={auth.remember}>Remember Me</Checkbox>
      </CheckboxGroup>
    </form>
  );
}