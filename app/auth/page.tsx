"use client";
import { FiFacebook, FiLinkedin, FiInstagram } from "react-icons/fi";
import Image from "next/image";
import { Link } from "@heroui/link";

import AuthForm from "@/components/app/auth-form";
import { siteConfig } from "@/config/site";

export default function Auth() {
  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="flex flex-col justify-between items-center">
        <p className="text-5xl my-20 font-bold">
          Mohamed Amine's Portfolio Management
        </p>
        <div className="flex flex-row justify-center items-center">
          <div>
            <Image alt="amine" height={600} src="/amine.png" width={600} />
          </div>
          <div className="w-full max-w-md bg-white/10 backdrop-blur-sm shadow-2xl rounded-2xl p-8 flex flex-col gap-6">
            <h1 className="text-4xl text-black font-bold text-center">
              Welcome Back
            </h1>
            <AuthForm />
            <div className="flex items-center w-full gap-4 my-2">
              <div className="flex-1 border-t border-black/50" />
              <p className="text-black/50 text-sm whitespace-nowrap">
                Connect Us From
              </p>
              <div className="flex-1 border-t border-black/50" />
            </div>

            <div className="flex items-center justify-center gap-6">
              <Link
                isExternal
                aria-label="Facebook"
                href={siteConfig.links.facebook}
              >
                <FiFacebook className="text-black/50 text-3xl cursor-pointer hover:text-sky-700 transition-colors" />
              </Link>
              <Link
                isExternal
                aria-label="Linkedin"
                href={siteConfig.links.linkedin}
              >
                <FiLinkedin className="text-black/50 text-3xl cursor-pointer hover:text-sky-700 transition-colors" />
              </Link>
              <Link
                isExternal
                aria-label="Instagram"
                href={siteConfig.links.instagram}
              >
                <FiInstagram className="text-black/50 text-3xl cursor-pointer hover:text-sky-700 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
