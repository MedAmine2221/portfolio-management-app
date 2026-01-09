"use client";;
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  NavbarMenu,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { GithubIcon, SearchIcon } from "@/components/icons";
import Image from "next/image";
import { FiFacebook, FiGithub, FiInstagram, FiLinkedin, FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import NavMenu from "./app/nav-menu";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearProfile } from "@/redux/profile/profileReducer";
import { removeToken } from "@/lib/cookies-management";
import { setLoadingFalse, setLoadingTrue } from "@/redux/loadingReducer";

export const Navbar = () => {
  const profile = useSelector((item: RootState)=> item?.profile?.items);
  const loading = useSelector((item: RootState)=> item?.loading?.loading);
  const dispatch = useDispatch();  
  const router = useRouter();
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

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
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
  const logout = async () => {
    try {
      dispatch(setLoadingTrue());
      await fetch("/api/logout", {
        method: "POST",
        body: JSON.stringify({ uid: profile?.uid }),
      });
      dispatch(clearProfile());
      await removeToken();
      router.replace("/auth");
    } catch (error) {
     console.error(error);
    }finally{
      dispatch(setLoadingFalse());
    }
  }
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/calendar/week-view">
            <Image alt= "amine" src={"/amine.png"} width={75} height={75} />
            <p className="font-bold text-inherit">Mohamed Amine LAZREG</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          <NavMenu />
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.facebook}>
            <FiFacebook size={20} className="hover:text-sky-700 text-default-500" />
          </Link>
          <Link isExternal aria-label="Discord" href={siteConfig.links.instagram}>
            <FiInstagram size={20} className="hover:text-sky-700 text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.linkedin}>
            <FiLinkedin size={20} className="hover:text-sky-700 text-default-500" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <FiGithub size={20} className="hover:text-sky-700 text-default-500" />
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            disabled={loading}
            isExternal
            as={Link}
            className="text-sm text-red-700 bg-red-100 border border-red-200 font-normal"
            onPress={logout}
            startContent={<FiLogOut size={20} color="var(--color-red-700)" />}
            variant="flat"
          >
            {loading ? "LoggingOut..." : "Logout"}
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
