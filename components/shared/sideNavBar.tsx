"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { CircleDollarSign, CircleUserRound, LogIn } from "lucide-react";
import {
  PaintBucket,
  Images,
  ImageUp,
  BookImage,
  ImageOff,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";

export function SidebarDemo() {
  const links = [
    
    {
      label: "Customize",
      href: "/customization",
      icon: (
        <Sparkles className="dark:text-yellow-300 text-blue-600 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Background Remove",
      href: "/transformations/add/removeBackground",
      icon: <Images className="text-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Image Restore",
      href: "/transformations/add/restore",
      icon: <ImageUp className="text-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Generative Fill",
      href: "/transformations/add/fill",
      icon: <BookImage className="text-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Image Remove",
      href: "/transformations/add/remove",
      icon: <ImageOff className="text-foreground h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Image Recolor",
      href: "/transformations/add/recolor",
      icon: <PaintBucket className="text-foreground h-5 w-5 flex-shrink-0" />,
    },
  ];

  const link = [
    {
      label: "My Logos",
      href: "/logos",
      icon: (
        <LayoutDashboard className="text-foreground h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/",
      icon: (
        <CircleUserRound className="text-foreground h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Buy Credits",
      href: "/credits",
      icon: (
        <CircleDollarSign className="text-foreground h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-r-md flex flex-col md:flex-row bg-background w-full flex-1 max-w-7xl mx-auto overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="flex flex-col justify-between h-full">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden px-4">
            {open ? <Logo /> : <LogoIcon />}
            <div className="">
              <SignedOut>{open ? <Sign /> : <SignIcon />}</SignedOut>
            </div>
            <SignedIn>
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </SignedIn>
          </div>
          <div className="mt-auto">
            <div className="px-4">
              <SignedIn>
                {link.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </SignedIn>
            </div>
            <div className="px-3">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>

            <div className="flex items-center justify-between pt-2 px-[0.6rem]">
              <ThemeToggle />
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-foreground py-1 relative z-20"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold whitespace-pre text-xl"
      >
        Image <span className="text-blue-400 font-bold">AI</span>
      </motion.span>
    </Link>
  );
};

export const Sign = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-foreground py-1 relative z-20"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold whitespace-pre text-xl"
      >
        <SignInButton>
          <button className="text-lg font-bold ">Sign In</button>
        </SignInButton>
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-foreground py-1 relative z-20"
    >
      <p className="text-xl font-bold text-blue-400">AI</p>
    </Link>
  );
};

export const SignIcon = () => {
  return (
    <Link
      href="*"
      className="font-normal flex space-x-2 items-center text-sm text-foreground py-1 relative z-20"
    >
      <LogIn className="h-5 w-5 flex-shrink-0" />
    </Link>
  );
};
