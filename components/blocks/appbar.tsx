"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Appbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  return (
    <div className="absolute top-0 right-0 m-4">
      {session?.user ? (
        <div className="flex gap-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer hover:opacity-80 transition">
                <AvatarImage
                  src={session.user.avatar ?? "/placeholder-avatar.png"}
                  alt={`${session.user.email}'s avatar`}
                />
                <AvatarFallback>
                  {session.user.email?.[0]?.toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex gap-4">
          <Button
            onClick={() => router.push("/auth/signin")}
            className="font-semibold"
            variant="secondary"
          >
            Sign in
          </Button>
          <Button
            onClick={() => router.push("/auth/signup")}
            className="font-semibold"
            variant="default"
          >
            Sign up
          </Button>
        </div>
      )}
    </div>
  );
}
