    'use client'
    import { useState } from 'react'
    import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
    import { WalletIcon } from '@heroicons/react/20/solid'
    import { Button } from './ui/button'
    import Link from 'next/link'
    import { deleteWallet } from '@/lib/wallet'
    import { Toaster } from './ui/toaster'
    import { useRouter } from 'next/navigation'
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
    import { useToast } from './ui/use-toast'
    import { redirect } from 'next/navigation'

    interface WalletProps {
        id: string,
        name: string,
        amount: number,
        currency: string,
        initial_balance: number,
        showButton?: boolean | true,
    }

    export default function Wallet({ id, name, amount, currency, initial_balance, showButton }: WalletProps) {
        const [open, setOpen] = useState(false)
        const { toast } = useToast();
        const router = useRouter()

        const calculatePercentage = (initial_balance: number, current_balance: number) => {
            return ((current_balance - initial_balance) / initial_balance) * 100
        }

        const percentageChange = calculatePercentage(initial_balance, amount)

        const handleDeleteWallet = async () => {
            try {
                await deleteWallet(id)
                setOpen(false)
                toast({
                    title: "Wallet deleted",
                    description: "Your wallet has been deleted.",
                    variant: "destructive",
                    duration: 5000,
                })
                router.push('/dashboard')
            } catch (error) {
                console.error("Error deleting wallet:", error);
                // You can handle errors here, e.g., show an error toast.
            }
        }

        return (
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        {name}
                    </CardTitle>
                    <WalletIcon className="h-6 w-6" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(amount)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {
                            percentageChange >= 0 ?
                                <span className="text-green-500">
                                    {percentageChange.toFixed(2)}% from your initial balance
                                </span>
                                :
                                <span className="text-red-500">
                                    {percentageChange.toFixed(2)}% from your initial balance
                                </span>
                        }
                    </p>
                    {showButton && (
                        <Button className="mt-4">
                            <Link href={`/wallet/${id}`}>View Wallet</Link>
                        </Button>
                    )}
                    {!showButton && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className='mt-4' variant="destructive">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        wallet and transaction under this wallet from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDeleteWallet}>
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </CardContent>
            </Card>
        )
    }
