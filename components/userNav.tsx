'use client'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid"
import { signIn, signOut, useSession } from "next-auth/react"
import { useEffect } from "react"


export function UserNav() {
    const { data: session } = useSession()

    if (!session) {
        return (
            <Button variant="ghost" onClick={() => signIn()}>
                Sign in
            </Button>
        )
    }
    const NameInitials = session.user?.name?.split(' ').map((n) => n[0]).join('') || ''

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={session.user?.image || ''} alt="@shadcn" />
                        <AvatarFallback>{NameInitials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {session.user?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    {/* Log out */}
                    <Button
                        variant="ghost"
                        className="w-full text-left"
                        onClick={() => signOut({ callbackUrl: '/' })}
                    >
                        Log out
                    </Button>
                    <DropdownMenuShortcut>
                        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}