
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { communicationsLog } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, AlertTriangle } from "lucide-react";

const automationRules = [
  {
    id: 1,
    name: "Upcoming Event Reminder",
    description: "Send an email reminder to clients 24 hours before an event.",
    trigger: "Event is 24 hours away",
    channel: "Email",
    enabled: true,
    icon: <Calendar className="h-5 w-5 text-blue-500" />
  },
  {
    id: 2,
    name: "Overdue Invoice Notification",
    description: "Send an SMS to clients when an invoice is overdue.",
    trigger: "Invoice status is 'Overdue'",
    channel: "SMS",
    enabled: true,
    icon: <AlertTriangle className="h-5 w-5 text-red-500" />
  },
  {
    id: 3,
    name: "New Client Welcome",
    description: "Send a welcome email when a new client is added.",
    trigger: "New client created",
    channel: "Email",
    enabled: false,
    icon: <Bell className="h-5 w-5 text-green-500" />
  }
]


export default function CommunicationsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="flex flex-col gap-6 lg:col-span-3">
        <PageHeader title="Automated Communications" description="Manage automated messages for your clients." />
        
        <Card>
          <CardHeader>
            <CardTitle>Automation Rules</CardTitle>
            <CardDescription>Enable or disable automated communication workflows.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {automationRules.map((rule) => (
              <div key={rule.id} className="flex items-start justify-between rounded-lg border p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    {rule.icon}
                  </div>
                  <div>
                    <p className="font-medium">{rule.name}</p>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                    <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Channel: <Badge variant="outline">{rule.channel}</Badge></span>
                    </div>
                  </div>
                </div>
                <Switch defaultChecked={rule.enabled} />
              </div>
            ))}
             <Button>Create New Rule</Button>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>A log of the last 10 automated messages sent.</CardDescription>
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
