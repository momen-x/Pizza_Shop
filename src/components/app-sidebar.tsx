"use client";

import { ImProfile } from "react-icons/im";
import { BiSolidCategory } from "react-icons/bi";
import { MdOutlineMenuBook } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
// import { GoListOrdered } from "react-icons/go";
import { MdProductionQuantityLimits } from "react-icons/md";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
// import Image from "next/image";
import Link from "@/app/_components/Link/Link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const url = "/Admin/";

// Menu items.
const items = [
  {
    title: "Profile",
    url: url,
    icon: ImProfile,
  },
  {
    title: "Categories",
    url: url + "categorie",
    icon: BiSolidCategory,
  },
  {
    title: "Menu Items",
    url: url + "menu-item",
    icon: MdOutlineMenuBook,
  },
  {
    title: "Users",
    url: url + "user",
    icon: FaUsers,
  },
  {
    title: "Products",
    url: url + "products",
    icon: MdProductionQuantityLimits,
  },
  // {
  //   title: "Orders",
  //   url: url + "order",
  //   icon: GoListOrdered,
  // },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const isActive = (itemUrl: string) => {
    if (itemUrl === "/Admin/") {
      return activePath === "/Admin";
    }

    return activePath.startsWith(itemUrl);
  };

  return (
    <Sidebar className="mt-18">
      <SidebarContent>
        <SidebarGroup>
          <Link href={"/Admin"}>
            <SidebarGroupLabel className="font-bold text-2xl cursor-pointer p-4 flex items-center hover:bg-gray-500 ">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3 text-gray-800 dark:text-gray-100">
                <span className="font-bold">A</span>
              </div>
              <h3 className="text-gray-950 dark:text-white">Admin Panel</h3>
            </SidebarGroupLabel>
          </Link>
          <SidebarGroupContent>
            <SidebarMenu className="mt-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`transition-colors duration-200 ${
                      isActive(item.url)
                        ? "bg-gray-700 text-white border-l-4 border-blue-500"
                        : "hover:bg-gray-400 text-gray-900 dark:text-gray-300"
                    }`}
                  >
                    <Link
                      href={item.url}
                      className="flex items-center w-full p-3"
                    >
                      <span className="mr-3 text-lg">
                        <item.icon />
                      </span>
                      <span className="font-medium">{item.title}</span>
                      {isActive(item.url) && (
                        <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
