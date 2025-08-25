"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { transactions, revenueData } from "@/lib/data";
import { DollarSign, TrendingUp, TrendingDown, FileText } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export default function FinancialsPage() {
    const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-500/20 text-green-700 border-green-500/20'
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/20'
      case 'Overdue':
        return 'bg-red-500/20 text-red-700 border-red-500/20'
      default:
        return 'bg-gray-500/20 text-gray-700 border-gray-500/20'
    }
  }
  
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Financials" description="Track revenue, expenses, and manage invoices.">
        <Button>Create Invoice</Button>
      </PageHeader>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$125,789.00</div>
                <p className="text-xs text-muted-foreground">YTD</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$62,134.50</div>
                <p className="text-xs text-muted-foreground">YTD</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$63,654.50</div>
                <p className="text-xs text-muted-foreground">YTD</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">8</div>
                 <p className="text-xs text-muted-foreground">Totaling $8,950.00</p>
            </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Revenue Over Time</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="var(--color-primary)" fill="var(--color-primary)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map(t => (
                    <TableRow key={t.id}>
                        <TableCell className="font-medium">{t.invoiceId}</TableCell>
                        <TableCell>{t.client}</TableCell>
                        <TableCell>{t.date}</TableCell>
                        <TableCell><Badge variant="outline" className={getStatusBadge(t.status)}>{t.status}</Badge></TableCell>
                        <TableCell className="text-right font-mono">${t.amount.toFixed(2)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
