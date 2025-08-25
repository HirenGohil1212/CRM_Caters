"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PageHeader } from "@/components/page-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { waiters } from "@/lib/data";
import { MoreHorizontal, Star } from "lucide-react";

export default function WaitersPage() {
    const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-500/20 text-green-700 border-green-500/20'
      case 'Assigned':
        return 'bg-blue-500/20 text-blue-700 border-blue-500/20'
      case 'Unavailable':
        return 'bg-gray-500/20 text-gray-700 border-gray-500/20'
      default:
        return 'bg-gray-500/20 text-gray-700 border-gray-500/20'
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Waiters" description="Manage waiter profiles, availability, and assignments.">
        <Button>Add Waiter</Button>
      </PageHeader>
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {waiters.map((waiter) => (
              <TableRow key={waiter.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={waiter.avatarUrl} alt={waiter.name} data-ai-hint="person face" />
                      <AvatarFallback>{waiter.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{waiter.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusBadge(waiter.status)}>
                    {waiter.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {waiter.rating.toFixed(1)}
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  </div>
                </TableCell>
                <TableCell>{waiter.email}</TableCell>
                <TableCell>{waiter.phone}</TableCell>
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
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Update Availability</DropdownMenuItem>
                      <DropdownMenuItem>Assign to Event</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
