'use client'
import { ColumnDef, Row } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Toaster } from '@/components/ui/toaster'
import { TransactionListSchema } from './schema'
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { deleteTransaction } from "@/lib/transaction"

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export default function ColumnAction<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const transaction = TransactionListSchema.parse(row.original)
    const [open, setOpen] = useState(false)
    const { toast } = useToast();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => setOpen(true)}
                    >
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem>View transaction details</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            transaction from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="hover:bg-red-70 bg-red-600"
                            onClick={
                                async () => {

                                    const res = await deleteTransaction(transaction._id)
                                    if (res === null || res.status === 'error') {
                                        return toast({
                                            title: "oops! something went wrong",
                                            description: res?.message || "Something went wrong",
                                            variant: "destructive"
                                        })
                                    } else {

                                        setOpen(false)
                                        toast({
                                            title: "Transaction deleted",
                                            description: "Your transaction has been deleted.",
                                            variant: "destructive",
                                            duration: 5000,
                                        })
                                    }
                                }
                            }
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
