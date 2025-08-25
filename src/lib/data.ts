import type { User, UserRole, Event, Waiter, Client, Transaction, Communication } from './types'

export const users: Record<UserRole, User> = {
  admin: { name: 'Admin User', email: 'admin@gilded.com', avatar: 'https://placehold.co/100x100.png' },
  hr: { name: 'HR Manager', email: 'hr@gilded.com', avatar: 'https://placehold.co/100x100.png' },
  accountant: { name: 'Accountant', email: 'accountant@gilded.com', avatar: 'https://placehold.co/100x100.png' },
  sales: { name: 'Sales Rep', email: 'sales@gilded.com', avatar: 'https://placehold.co/100x100.png' },
};

export const events: Event[] = [
  { id: 1, name: "Innovate Corp Gala", client: "Innovate Corp", date: "2024-08-15", waitersRequired: 20, waitersAssigned: 18, status: "Upcoming" },
  { id: 2, name: "Tech Solutions Summit", client: "Tech Solutions", date: "2024-08-20", waitersRequired: 15, waitersAssigned: 15, status: "Upcoming" },
  { id: 3, name: "Artistry Unleashed", client: "Creative Minds", date: "2024-07-25", waitersRequired: 10, waitersAssigned: 10, status: "Completed" },
  { id: 4, name: "HealthWell Conference", client: "HealthWell Inc.", date: "2024-09-01", waitersRequired: 25, waitersAssigned: 10, status: "Upcoming" },
  { id: 5, name: "EcoVibes Charity Ball", client: "Green Earth Foundation", date: "2024-07-10", waitersRequired: 12, waitersAssigned: 12, status: "Cancelled" },
];

export const waiters: Waiter[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "123-456-7890", status: "Available", rating: 4.8, avatarUrl: 'https://placehold.co/40x40.png' },
  { id: 2, name: "Bob Williams", email: "bob@example.com", phone: "123-456-7891", status: "Assigned", rating: 4.5, avatarUrl: 'https://placehold.co/40x40.png' },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", phone: "123-456-7892", status: "Available", rating: 4.9, avatarUrl: 'https://placehold.co/40x40.png' },
  { id: 4, name: "Diana Miller", email: "diana@example.com", phone: "123-456-7893", status: "Unavailable", rating: 4.2, avatarUrl: 'https://placehold.co/40x40.png' },
  { id: 5, name: "Ethan Davis", email: "ethan@example.com", phone: "123-456-7894", status: "Assigned", rating: 4.7, avatarUrl: 'https://placehold.co/40x40.png' },
];

export const clients: Client[] = [
  { id: 1, company: "Innovate Corp", contactName: "John Smith", email: "john@innovate.com", phone: "555-0101", status: "Active" },
  { id: 2, company: "Tech Solutions", contactName: "Jane Doe", email: "jane@techsol.com", phone: "555-0102", status: "Active" },
  { id: 3, company: "Creative Minds", contactName: "Sam Wilson", email: "sam@creative.com", phone: "555-0103", status: "Inactive" },
  { id: 4, company: "HealthWell Inc.", contactName: "Emily White", email: "emily@healthwell.com", phone: "555-0104", status: "Active" },
];

export const transactions: Transaction[] = [
    { id: 1, invoiceId: "INV-001", client: "Innovate Corp", date: "2024-07-20", status: "Paid", amount: 15000.00 },
    { id: 2, invoiceId: "INV-002", client: "Tech Solutions", date: "2024-07-22", status: "Pending", amount: 8500.00 },
    { id: 3, invoiceId: "INV-003", client: "Creative Minds", date: "2024-06-15", status: "Overdue", amount: 5000.00 },
    { id: 4, invoiceId: "INV-004", client: "HealthWell Inc.", date: "2024-07-25", status: "Paid", amount: 22000.00 },
];

export const communicationsLog: Communication[] = [
  { id: 1, to: "john@innovate.com", type: "Email", status: "Sent", date: "2024-08-01" },
  { id: 2, to: "+1234567891", type: "SMS", status: "Sent", date: "2024-08-01" },
  { id: 3, to: "jane@techsol.com", type: "Email", status: "Failed", date: "2024-07-31" },
  { id: 4, to: "+1234567893", type: "WhatsApp", status: "Sent", date: "2024-07-30" },
];

export const revenueData = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 2000, expenses: 9800 },
  { name: 'Apr', revenue: 2780, expenses: 3908 },
  { name: 'May', revenue: 1890, expenses: 4800 },
  { name: 'Jun', revenue: 2390, expenses: 3800 },
  { name: 'Jul', revenue: 3490, expenses: 4300 },
];

export const salesData = [
    { name: 'Leads', value: 100 },
    { name: 'Contacted', value: 80 },
    { name: 'Proposal', value: 50 },
    { name: 'Negotiation', value: 30 },
    { name: 'Won', value: 20 },
];

export const waiterActivityData = [
  { name: 'Alice J.', hours: 120 },
  { name: 'Bob W.', hours: 100 },
  { name: 'Charlie B.', hours: 140 },
  { name: 'Diana M.', hours: 80 },
  { name: 'Ethan D.', hours: 110 },
];

export const eventSummaryData = [
  { month: 'Jan', count: 10 },
  { month: 'Feb', count: 8 },
  { month: 'Mar', count: 15 },
  { month: 'Apr', count: 12 },
  { month: 'May', count: 18 },
  { month: 'Jun', count: 20 },
];

export const clientAcquisitionData = [
  { month: 'Jan', clients: 5 },
  { month: 'Feb', clients: 7 },
  { month: 'Mar', clients: 6 },
  { month: 'Apr', clients: 9 },
  { month: 'May', clients: 12 },
  { month: 'Jun', clients: 10 },
];
