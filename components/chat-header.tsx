"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout } from "@/features/auth/services/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";

export const ChatHeader = () => {
  const router = useRouter();
  const {
    isLoading,
    error,
    data: user,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      if (data.success) {
        router.push("/");
      }
    },
  });
  return (
    <header className="border-b">
      <div className="bg-header py-4 flex justify-between items-center max-w-5xl mx-auto p-4 ">
        <div className="flex gap-3 items-center">
          <Image
            src="/logo-mmg.webp"
            width={40}
            height={40}
            alt="logo de mmg"
          />
          <h1>AI Agents Platform </h1>
        </div>
        {isLoading ? (
          <div className="flex gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="grid flex-1 items-center text-left text-sm leading-tight">
              <Skeleton className="h-2 w-24 mb-2 rounded" />
              <Skeleton className="h-2 w-32 rounded" />
            </div>
          </div>
        ) : error ? (
          <div>Error loading user</div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-3 items-center">
              <Avatar className="rounded-md">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="uppercase">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => mutation.mutate()}>
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};
