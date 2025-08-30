"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PageHeader } from "@/components/page-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { events } from "@/lib/data"
import { MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function EventsPage() {
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

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Events" description="Schedule and manage all client events.">
        <Button>Schedule New Event</Button>
      </PageHeader>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Event Name</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="whitespace-nowrap">Waiters Assigned</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium whitespace-nowrap">{event.name}</TableCell>
                    <TableCell>{event.client}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.waitersAssigned}/{event.waitersRequired}</TableCell>
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
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Manage Waiters</DropdownMenuItem>
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
