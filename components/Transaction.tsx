"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { DatePickerWithRange } from "./ui/date-range-picker"

interface TransactionProps {
  name: string
  value: number
}


export function Transaction(
  { data }: { data: TransactionProps[] }
) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-8">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          {/* TODO: Add date range support */}
          {/* <DatePickerWithRange /> */}
          <CardDescription>Your Express</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={true}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={true}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Bar dataKey="value" fill="#16a34b" radius={[2, 2, 0, 0]} legendType="none" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}