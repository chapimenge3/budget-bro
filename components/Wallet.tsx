import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { WalletIcon } from '@heroicons/react/20/solid'
import { Button } from './ui/button'
import Link from 'next/link'

interface WalletProps {
    id: number
    name: string
    amount: number,
    currency: string,
}


export default function Wallet({ id, name, amount, currency }: WalletProps) {
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
                {/* <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                </p> */}
                <Button className="mt-4">
                    <Link href={`/wallet/${id}`}>
                        View Wallet
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}
