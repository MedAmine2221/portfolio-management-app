"use client";;
import { FiFacebook, FiLinkedin, FiInstagram } from "react-icons/fi";
import AuthForm from "@/components/app/auth-form";
export default function Auth() {
  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-sm shadow-2xl rounded-2xl p-8 flex flex-col gap-6">
        <h1 className="text-4xl text-white font-bold text-center">Welcome Back</h1>
        <AuthForm />
        <div className="flex items-center w-full gap-4 my-2">
          <div className="flex-1 border-t border-white/40" />
          <p className="text-white/80 text-sm whitespace-nowrap">
            Connect Us From
          </p>
          <div className="flex-1 border-t border-white/40" />
        </div>

        <div className="flex items-center justify-center gap-6">
          <FiFacebook className="text-white/50 text-3xl cursor-pointer hover:text-white/80 transition-colors" />
          <FiLinkedin className="text-white/50 text-3xl cursor-pointer hover:text-white/80 transition-colors" />
          <FiInstagram className="text-white/50 text-3xl cursor-pointer hover:text-white/80 transition-colors" />
        </div>
      </div>
    </div>
  );
}