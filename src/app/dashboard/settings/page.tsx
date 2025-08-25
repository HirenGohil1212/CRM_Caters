"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Settings" description="Manage your account settings and preferences." />
      
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john.doe@gilded.com" />
          </div>
          <Button>Update Profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email for important updates.</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
            </div>
            <Separator />
             <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="sms-notifications" className="font-medium">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive critical alerts via SMS.</p>
                </div>
                <Switch id="sms-notifications" />
            </div>
             <Separator />
             <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="whatsapp-notifications" className="font-medium">WhatsApp Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get reminders and updates on WhatsApp.</p>
                </div>
                <Switch id="whatsapp-notifications" defaultChecked />
            </div>
            <Button>Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  )
}
