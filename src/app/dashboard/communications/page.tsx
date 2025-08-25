"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/page-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { communicationsLog } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function CommunicationsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="flex flex-col gap-6 lg:col-span-3">
        <PageHeader title="Communications" description="Send updates to clients via Email, SMS, or WhatsApp." />
        <Tabs defaultValue="email">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Compose Email</CardTitle>
                <CardDescription>Send an email to a client or group.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-to">To</Label>
                  <Input id="email-to" placeholder="client@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-subject">Subject</Label>
                  <Input id="email-subject" placeholder="Event Reminder" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-message">Message</Label>
                  <Textarea id="email-message" placeholder="Hi [Client Name], this is a reminder..." rows={6}/>
                </div>
                <Button>Send Email</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="sms">
            <Card>
              <CardHeader>
                <CardTitle>Compose SMS</CardTitle>
                <CardDescription>Send a text message to a client.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sms-to">To</Label>
                  <Input id="sms-to" placeholder="+1234567890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sms-message">Message</Label>
                  <Textarea id="sms-message" placeholder="Hi [Client Name], reminder..." rows={4} maxLength={160} />
                </div>
                <Button>Send SMS</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="whatsapp">
            <Card>
              <CardHeader>
                <CardTitle>Compose WhatsApp Message</CardTitle>
                <CardDescription>Send a message via WhatsApp.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="space-y-2">
                  <Label htmlFor="wa-to">To</Label>
                  <Input id="wa-to" placeholder="+1234567890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wa-message">Message</Label>
                  <Textarea id="wa-message" placeholder="Hi [Client Name], reminder..." rows={6} />
                </div>
                <Button>Send WhatsApp</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>A log of the last 10 messages sent.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>To</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {communicationsLog.map(log => (
                  <TableRow key={log.id}>
                    <TableCell className="font-medium">{log.to}</TableCell>
                    <TableCell><Badge variant="outline">{log.type}</Badge></TableCell>
                    <TableCell><Badge variant={log.status === 'Sent' ? 'default' : 'destructive'} className={log.status === 'Sent' ? 'bg-green-500/20 text-green-700 border-green-500/20' : 'bg-red-500/20 text-red-700 border-red-500/20'}>{log.status}</Badge></TableCell>
                    <TableCell>{log.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
