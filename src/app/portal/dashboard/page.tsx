"use client"

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageHeader } from "@/components/page-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Mail, Phone } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { events } from "@/lib/data";
import type { Event } from "@/lib/types";

export default function ClientDashboardPage() {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-500/20 text-blue-700 border-blue-500/20'
      case 'Completed':
        return 'bg-green-500/20 text-green-700 border-green-500/20'
      case 'Cancelled':
        return 'bg-red-500/20 text-red-700 border-red-500/20'
      default:
        return 'bg-gray-500/20 text-gray-700 border-gray-500/20'
    }
  }
  
  // Filter events for a dummy client "Innovate Corp"
  const clientEvents = events.filter(e => e.client === "Innovate Corp");

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Your Event Requests" description="View your past and upcoming event requests.">
        <Button>Request New Event</Button>
      </PageHeader>
      <Card>
        <CardHeader>
            <CardTitle>My Events</CardTitle>
            <CardDescription>A list of all your event requests with us.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Waiters Required</TableHead>
                <TableHead>Waiters Assigned</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {clientEvents.map((event) => (
                <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.waitersRequired}</TableCell>
                    <TableCell>{event.waitersAssigned}</TableCell>
                    <TableCell>
                    <Badge variant="outline" className={getStatusBadge(event.status)}>
                        {event.status}
                    </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setSelectedEvent(event)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem disabled={event.status !== 'Upcoming'}>Cancel Event</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
      </Card>
      
      <Dialog open={!!selectedEvent} onOpenChange={(isOpen) => !isOpen && setSelectedEvent(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.name} - Assigned Staff</DialogTitle>
          </DialogHeader>
          {selectedEvent?.assignedWaiters && selectedEvent.assignedWaiters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              {selectedEvent.assignedWaiters.map(waiter => (
                <Card key={waiter.id}>
                  <CardHeader className="flex flex-row items-center gap-4">
                     <Avatar>
                      <AvatarImage src={waiter.avatarUrl} alt={waiter.name} data-ai-hint="person face" />
                      <AvatarFallback>{waiter.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{waiter.name}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-yellow-500">
                          {waiter.rating.toFixed(1)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${waiter.email}`} className="hover:underline">{waiter.email}</a>
                    </div>
                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <a href={`tel:${waiter.phone}`} className="hover:underline">{waiter.phone}</a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="py-4 text-center text-muted-foreground">No staff have been assigned to this event yet.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
