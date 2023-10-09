"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import ColumnAction from './columnAction'

export type TransactionType = {
    _id: string
    type: string
    note: string
    date: Date
    amount: number
    currency?: string
}

export const columns: ColumnDef<TransactionType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="items-left"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "note",
        header: "Note",
        cell: ({ row }) => {
            return <div className="text-left">{row.getValue("note") || "-"}</div>
        }
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="items-left"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: row.original.currency ?? "USD",
            }).format(amount)

            const textColor = row.original.type === "expense" ? "text-red-500" : "text-green-500"
            return (
                <div className={textColor + " text-center"}>
                    {row.original.type === "expense" ? "-" : "+"}
                    {formatted}
                </div>
            )
        }
    },
    {
        accessorKey: "date",
        header: () => <div className="text-left">Date</div>,
        cell: ({ row }) => {
            try {
                const date = new Date(row.getValue("date"))
                const formatted = new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                }).format(date)
                return <div className="text-left">{formatted}</div>
            }
            catch (err) {
                return <div className="text-left">Invalid date</div>
            }
        },
        enableSorting: true,
    },
    {
        id: "actions",
        cell: ({ row }) => <ColumnAction row={row} />
    }
]
