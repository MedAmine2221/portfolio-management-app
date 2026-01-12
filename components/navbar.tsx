"use client";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import NextLink from "next/link";
import { FiFacebook, FiInstagram, FiLinkedin, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import { useDispatch, useSelector } from "react-redux";

import NavMenu from "./app/nav-menu";

import { GithubIcon, SearchIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { RootState } from "@/redux/store";
import { clearProfile } from "@/redux/profile/profileReducer";
import { clearClients } from "@/redux/clients/clientReducer";
import { clearCalendar } from "@/redux/calendar/calendarReducer";
import { updateUserInfo } from "@/lib/server-functions";

export const Navbar = () => {
  const profile: any = useSelector((item: RootState) => item?.profile?.items);
  const router = useRouter();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const match = siteConfig.navItems.find(
        (item) => item.label.toLowerCase() === search.toLowerCase(),
      );

      if (match) router.push(match.href);
      else alert("Page not found");
    }
  };

  const logout = async () => {
    try {
      updateUserInfo({uid: profile?.uid})
      dispatch(clearProfile());
      dispatch(clearClients());
      dispatch(clearCalendar());
      router.replace("/auth");
    } catch (error) {
      console.error(error);
    }
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper:
          "bg-default-100/50 border border-default-200/50 hover:border-default-300 transition-colors",
        input: "text-sm",
      }}
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none" />
      }
      type="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );

  const socialLinks = (
    <div className="flex items-center">
      <Link
        isExternal
        className="mx-2 text-default-500 hover:text-primary transition-colors"
        href={siteConfig.links.linkedin}
      >
        <FiLinkedin size={20} />
      </Link>
      <Link
        isExternal
        className="text-default-500 hover:text-primary transition-colors"
        href={siteConfig.links.facebook}
      >
        <FiFacebook size={20} />
      </Link>
      <Link
        isExternal
        className="mx-2 text-default-500 hover:text-primary transition-colors"
        href={siteConfig.links.instagram}
      >
        <FiInstagram size={20} />
      </Link>
      <Link
        isExternal
        className="text-default-500 hover:text-primary transition-colors"
        href={siteConfig.links.github}
      >
        <GithubIcon size={20} />
      </Link>
    </div>
  );

  return (
    <div className="w-full backdrop-blur-lg bg-white/70 border-b border-default-200/20 sticky top-0 z-50">
      <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-6 py-3">
        <NextLink
          className="flex flex-row items-center font-bold text-black text-lg tracking-tight hover:text-black transition-colors"
          href="/calendar/week-view"
        >
          <Image alt="amine" height={75} src={"/amine.png"} width={75} />
          Mohamed Amine LAZREG
        </NextLink>
        <NavMenu />
        <div className="flex items-center gap-6">
          {socialLinks}
          <div className="hidden lg:block">{searchInput}</div>
          <Button
            isExternal
            as={Link}
            className="text-sm text-red-700 bg-red-100 border border-red-200 font-normal"
            variant="flat"
            onPress={logout}
          >
            <FiLogOut color="var(--color-red-700)" size={20} />
          </Button>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex items-center justify-between px-6 py-3">
          <NextLink
            className="font-bold text-black text-lg tracking-tight"
            href="/calendar/week-view"
          >
            <Image alt="amine" height={75} src={"/amine.png"} width={75} />
          </NextLink>
          {socialLinks}
          <Button
            isExternal
            as={Link}
            className="ml-4 text-sm text-red-700 bg-red-100 border border-red-200 font-normal"
            variant="flat"
            onPress={logout}
          >
            <FiLogOut color="var(--color-red-700)" size={20} />
          </Button>
        </div>
        <div className="w-full border-t border-default-200/20 py-3">
          <div className="overflow-x-auto scrollbar-hide px-3">
            <div className="inline-flex justify-center w-full">
              <NavMenu isMobile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
