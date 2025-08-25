"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  Users,
  DollarSign,
  Briefcase,
  MessageCircle,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { useUser } from "@/contexts/user-context"
import type { UserRole } from "@/lib/types"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ['admin', 'hr', 'accountant', 'sales'] },
  { href: "/dashboard/events", label: "Events", icon: Calendar, roles: ['admin', 'hr', 'accountant', 'sales'] },
  { href: "/dashboard/waiters", label: "Waiters", icon: Users, roles: ['admin', 'hr'] },
  { href: "/dashboard/clients", label: "Clients", icon: Briefcase, roles: ['admin', 'accountant', 'sales'] },
  { href: "/dashboard/financials", label: "Financials", icon: DollarSign, roles: ['admin', 'accountant'] },
  { href: "/dashboard/communications", label: "Communications", icon: MessageCircle, roles: ['admin', 'sales'] },
  { href: "/dashboard/settings", label: "Settings", icon: Settings, roles: ['admin', 'hr', 'accountant', 'sales'] },
]

export function DashboardNav() {
  const pathname = usePathname();
  const { role } = useUser();

  const filteredNavItems = navItems.filter(item => item.roles.includes(role as UserRole));

  return (
    <SidebarMenu>
      {filteredNavItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href}>
            <SidebarMenuButton
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
