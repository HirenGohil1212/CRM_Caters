import { LucideIcon } from "lucide-react";

export type UserRole = 'admin' | 'hr' | 'accountant' | 'sales';

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: UserRole[];
}

export type Permissions = {
  [K in Exclude<UserRole, 'admin'>]: {
    events: boolean;
    waiters: boolean;
    clients: boolean;
    financials: boolean;
    communications: boolean;
    settings: boolean;
    roles: boolean;
  }
};

export interface Event {
  id: number;
  name: string;
  client: string;
  date: string;
  waitersRequired: number;
  waitersAssigned: number;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  assignedWaiters?: Waiter[];
}

export interface Waiter {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'Available' | 'Assigned' | 'Unavailable';
  rating: number;
  avatarUrl: string;
}

export interface Client {
  id: number;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  gstNumber?: string;
}

export interface Transaction {
    id: number;
    invoiceId: string;
    client: string;
    date: string;
    status: 'Paid' | 'Pending' | 'Overdue';
    amount: number;
}

export interface Communication {
    id: number;
    to: string;
    type: 'Email' | 'SMS' | 'WhatsApp';
    status: 'Sent' | 'Failed';
    date: string;
}
