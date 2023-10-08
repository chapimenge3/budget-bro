'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { Toaster } from "./ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { createWallet } from "@/lib/wallet"
import { useState } from "react"

const formSchema = z.object({
    name: z.string().min(1, "Name is required").max(15, "Max is 15 characters"),
    balance: z.number().min(0, "Must be positive"),
    currency: z.string().min(1, "Required").max(3, "Max is 3 characters"),
})


export default function AddWallet() {
    const [open, setOpen] = useState(false)
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const newWallet = await createWallet(data.name, data.balance, data.currency)
        if (newWallet === null || newWallet.status === 'error') {
            return toast({
                description: newWallet?.message || "Something went wrong",
                variant: "destructive"
            })
        } else {
            setOpen(false)
            toast({
                description: newWallet?.message || "Wallet created successfully",
            })
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Toaster />
            <DialogTrigger asChild>
                <Button className="mt-4" onClick={() => {
                    setOpen(true)
                }}>
                    Add Wallet
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    Create Wallet Form
                </DialogTitle>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Wallet Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ex. ABC Bank" {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your wallet name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="balance"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Wallet Balance</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ex. 1000" {...field}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                const floatValue = parseFloat(value)
                                                if (isNaN(floatValue)) {
                                                    return
                                                } else {
                                                    field.onChange(floatValue)
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Your wallet current balance.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="currency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Currency</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ex. BHD" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your currency BHD or USD
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            className="mr-4"
                            variant="destructive"
                            onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}
