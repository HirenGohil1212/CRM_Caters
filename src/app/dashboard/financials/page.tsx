"use client"

import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { transactions, revenueData, clients } from "@/lib/data";
import { DollarSign, TrendingUp, TrendingDown, FileText } from "lucide-react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import type { Client } from "@/lib/types";

const InvoiceTemplate = ({ client, invoiceType, invoiceNumber }: { client: Client, invoiceType: string, invoiceNumber: number }) => {
  const subtotal = 3500;
  const gstRate = 0.18;
  const gstAmount = invoiceType === 'gst' ? subtotal * gstRate : 0;
  const total = subtotal + gstAmount;

  return (
    <div className="p-8 bg-white text-black max-w-2xl mx-auto font-sans">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gilded Events</h1>
          <p className="text-gray-500">123 Event Lane, Celebration City, 12345</p>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-bold text-gray-700">INVOICE</h2>
          <p><span className="font-bold">Invoice Number:</span> INV-{invoiceNumber}</p>
          <p><span className="font-bold">Invoice Date:</span> {new Date().toLocaleDateString()}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <h3 className="font-bold text-gray-600">Bill To</h3>
          <p>{client.company}</p>
          <p>{client.contactName}</p>
          <p>{client.email}</p>
          <p>{client.phone}</p>
          {invoiceType === 'gst' && client.gstNumber && (
            <p><span className="font-bold">GSTIN:</span> {client.gstNumber}</p>
          )}
        </div>
      </div>
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left p-2">Description</th>
            <th className="text-right p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border-b">Event Management Services</td>
            <td className="text-right p-2 border-b">$3500.00</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end">
        <div className="w-1/2">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {invoiceType === 'gst' && (
            <div className="flex justify-between mb-2">
              <span>GST ({gstRate * 100}%)</span>
              <span>${gstAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
       <div className="mt-12 text-center text-gray-500 text-xs">
          <p>Thank you for your business!</p>
          <p>Please make payment within 30 days.</p>
        </div>
    </div>
  )
}

export default function FinancialsPage() {
    const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
    const [invoiceType, setInvoiceType] = useState("non-gst");
    const [invoiceData, setInvoiceData] = useState<{client: Client, invoiceType: string, invoiceNumber: number} | null>(null);
    const { toast } = useToast();
    const invoiceRef = useRef<HTMLDivElement>(null);


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

  const handleGenerateBill = async () => {
    if (!selectedClientId) {
      toast({
        title: "Error",
        description: "Please select a client.",
        variant: "destructive",
      });
      return;
    }
    const client = clients.find(c => c.id.toString() === selectedClientId);
    if (!client) return;

    const invoiceNumber = transactions.length + 1;
    const data = { client, invoiceType, invoiceNumber };
    setInvoiceData(data);

    // Allow state to update and component to render
    setTimeout(async () => {
      if (invoiceRef.current) {
        const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`invoice-INV-${invoiceNumber}-${client.company}.pdf`);

        toast({
          title: "Bill Generated",
          description: "The bill has been successfully downloaded.",
        });
        setIsInvoiceDialogOpen(false);
        setInvoiceData(null);
      }
    }, 100);
  }
  
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Financials" description="Track revenue, expenses, and manage invoices.">
        <Dialog open={isInvoiceDialogOpen} onOpenChange={setIsInvoiceDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create Invoice</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Generate New Invoice</DialogTitle>
              <DialogDescription>
                Select a client and invoice type to generate a new bill.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="client">Client Company</Label>
                <Select onValueChange={setSelectedClientId} value={selectedClientId || undefined}>
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map(client => (
                      <SelectItem key={client.id} value={client.id.toString()}>{client.company}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Invoice Type</Label>
                <RadioGroup defaultValue={invoiceType} onValueChange={setInvoiceType} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non-gst" id="r-non-gst" />
                    <Label htmlFor="r-non-gst">Non-GST</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gst" id="r-gst" />
                    <Label htmlFor="r-gst">GST</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setIsInvoiceDialogOpen(false)}>Cancel</Button>
              <Button type="button" onClick={handleGenerateBill}>Download Bill</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      {/* Hidden Invoice for PDF Generation */}
      <div className="absolute -z-10 -left-[9999px] top-0">
          {invoiceData && <div ref={invoiceRef}><InvoiceTemplate {...invoiceData} /></div>}
      </div>


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
        </Header>
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
