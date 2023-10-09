'use client';
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { Toaster } from './ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { createTransaction } from '@/lib/transaction';
// import { createTransaction } from '@/lib/transaction';

interface WalletChoiceProps {
    _id: string,
    name: string
}

interface CategoryChoiceProps {
    _id: string,
    name: string,
    color: string
    icon: string
}

interface LabelChoiceProps {
    _id: string,
    name: string,
}


const formSchema = z.object({
    // wallet id should be a dropdown of all the wallets
    wallet_id: z.string().optional(),
    category_id: z.string().optional(),
    label_id: z.string().optional(),
    note: z.string().optional(),
    amount: z.number().positive({ message: 'Amount should be positive' }),
    type: z.string().optional(),
});


interface AddTransactionProps<TData, TValue> {
    wallets?: WalletChoiceProps[]
    categories?: CategoryChoiceProps[]
    labels?: LabelChoiceProps[]
}

export default function AddTransaction<TData, TValue>({
    wallets, categories, labels,
}: AddTransactionProps<TData, TValue>) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const transactionForm = useForm({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(data: any) {
        if (!data.wallet_id) {
            return toast({
                title: 'uh oh! You missed to select wallet',
                description: 'Please select a wallet',
                variant: 'destructive',
                duration: 4000,
            });
        }
        if (!data.type) {
            return toast({
                title: 'uh oh! You missed to select `type`',
                description: 'Please select a type',
                variant: 'destructive',
                duration: 4000,
            });
        }
        const newTransaction = await createTransaction(
            data.wallet_id,
            data.category_id || null,
            data.label_id || null,
            data.note,
            data.amount,
            data.type,
        );
        if (newTransaction === null || newTransaction.status === 'error') {
            toast({
                title: 'uh oh! Error',
                description: newTransaction?.message || 'Something went wrong',
                variant: 'destructive',
            });
        } else {
            setOpen(false);
            toast({
                title: 'Transaction created successfully',
                description: newTransaction?.message || 'Transaction created successfully',
            });
            transactionForm.reset();
        }
        // reset the form

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="ml-auto mt-4" onClick={() => setOpen(true)}>
                    Add Transaction
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Create Transaction Form</DialogTitle>
                <Toaster  />
                <Form {...transactionForm}>
                    <form onSubmit={transactionForm.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={transactionForm.control}
                            name="wallet_id"
                            render={({ field }) => (
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder="Select a wallet"
                                                className="w-full"
                                                {...field}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {wallets?.map((wallet) => (
                                                <SelectItem
                                                    key={wallet._id}
                                                    value={wallet._id}
                                                >
                                                    {wallet.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            )}
                        />
                        <FormField
                            control={transactionForm.control}
                            name="category_id"
                            render={({ field }) => (
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder="Select a Category (optional)"
                                                className="w-full"
                                                {...field}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories?.map((category) => (
                                                <SelectItem
                                                    key={category._id}
                                                    value={category._id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            )}
                        />

                        <FormField
                            control={transactionForm.control}
                            name="label_id"
                            render={({ field }) => (
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder="Select a Label (optional)"
                                                className="w-full"
                                                {...field}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {labels?.map((label) => (
                                                <SelectItem
                                                    key={label._id}
                                                    value={label._id}
                                                >
                                                    {label.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            )}
                        />
                        <FormField
                            control={transactionForm.control}
                            name="note"
                            render={({ field }) => (
                                <FormControl>
                                    <Input placeholder="Note" {...field} />
                                </FormControl>
                            )}
                        />
                        <FormField
                            control={transactionForm.control}
                            name="amount"
                            render={({ field }) => (
                                <FormControl>
                                    <Input
                                        placeholder="Amount"
                                        type="number"
                                        {...field}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            const floatValue = parseFloat(value);
                                            if (!isNaN(floatValue)) {
                                                field.onChange(floatValue);
                                            }
                                        }}
                                    />
                                </FormControl>
                            )}
                        />
                        <FormField
                            control={transactionForm.control}
                            name="type"
                            render={({ field }) => (
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder="Select a type"
                                                className="w-full"
                                                {...field}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem
                                                key={'expense'}
                                                value={'expense'}
                                            >
                                                Expense
                                            </SelectItem>
                                            <SelectItem
                                                key={'income'}
                                                value={'income'}
                                                defaultChecked
                                            >
                                                Income
                                            </SelectItem>

                                            <SelectItem
                                                key={'transfer'}
                                                value={'transfer'}
                                            >
                                                Transfer
                                            </SelectItem>

                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            )}
                        />
                        <Button
                            className="mr-4"
                            variant="destructive"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
