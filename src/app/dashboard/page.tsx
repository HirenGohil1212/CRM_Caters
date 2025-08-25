"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useUser } from '@/contexts/user-context'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Calendar, Users, DollarSign, Briefcase, TrendingUp } from 'lucide-react'
import { salesData, revenueData, waiterActivityData, eventSummaryData, clientAcquisitionData } from '@/lib/data'

const AdminDashboard = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+12</div>
        <p className="text-xs text-muted-foreground">+5 this week</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Waiters</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">57</div>
        <p className="text-xs text-muted-foreground">2 newly onboarded</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">New Clients</CardTitle>
        <Briefcase className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+23</div>
        <p className="text-xs text-muted-foreground">+10.2% from last month</p>
      </CardContent>
    </Card>
    <Card className="col-span-1 md:col-span-2 lg:col-span-4">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="var(--color-primary)" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);

const HRDashboard = () => (
  <div className="grid gap-6 md:grid-cols-2">
     <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Waiters</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">75</div>
        <p className="text-xs text-muted-foreground">5 available for assignment</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Events This Week</CardTitle>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">8</div>
        <p className="text-xs text-muted-foreground">Requires staffing for 3</p>
      </CardContent>
    </Card>
     <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Waiter Activity</CardTitle>
          <CardDescription>Hours worked by waiters this month.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={waiterActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="var(--color-accent)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
  </div>
);
const AccountantDashboard = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
     <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
     <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$22,500.50</div>
        <p className="text-xs text-muted-foreground">+15% from last month</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$22,731.39</div>
        <p className="text-xs text-muted-foreground">+25.2% from last month</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
        <Briefcase className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">15</div>
        <p className="text-xs text-muted-foreground">Totaling $12,345.00</p>
      </CardContent>
    </Card>
    <Card className="col-span-1 md:col-span-2 lg:col-span-4">
      <CardHeader>
        <CardTitle>Financial Summary</CardTitle>
        <CardDescription>Monthly financial performance.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="var(--color-primary)" name="Revenue" />
            <Line type="monotone" dataKey="expenses" stroke="var(--color-accent)" name="Expenses" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
);

const SalesDashboard = () => (
  <div className="grid gap-6 md:grid-cols-2">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">New Leads</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">45</div>
        <p className="text-xs text-muted-foreground">+180% from last month</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">25.5%</div>
        <p className="text-xs text-muted-foreground">+2.5% from last month</p>
      </CardContent>
    </Card>
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Sales Funnel</CardTitle>
        <CardDescription>Leads progression through the sales funnel.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" width={80} />
            <Tooltip />
            <Bar dataKey="value" fill="var(--color-primary)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
    <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Client Acquisition</CardTitle>
          <CardDescription>New clients acquired per month.</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={clientAcquisitionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="clients" stroke="var(--color-accent)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
  </div>
);

const roleDashboards = {
  admin: <AdminDashboard />,
  hr: <HRDashboard />,
  accountant: <AccountantDashboard />,
  sales: <SalesDashboard />,
};

export default function DashboardPage() {
  const { role, user } = useUser();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome, {user.name}!</h1>
        <p className="text-muted-foreground">Here&apos;s your overview for today.</p>
      </div>
      {roleDashboards[role]}
    </div>
  );
}
