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
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { useUser } from "@/contexts/user-context"
import type { UserRole, NavItem } from "@/lib/types"

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ['admin', 'hr', 'accountant', 'sales'] },
  { href: "/dashboard/events", label: "Events", icon: Calendar, roles: ['admin', 'hr', 'accountant', 'sales'] },
  { href: "/dashboard/waiters", label: "Waiters", icon: Users, roles: ['admin', 'hr'] },
  { href: "/dashboard/clients", label: "Clients", icon: Briefcase, roles: ['admin', 'accountant', 'sales'] },
  { href: "/dashboard/financials", label: "Financials", icon: DollarSign, roles: ['admin', 'accountant'] },
  { href: "/dashboard/communications", label: "Communications", icon: MessageCircle, roles: ['admin', 'sales'] },
  { href: "/dashboard/roles", label: "Roles", icon: Shield, roles: ['admin'] },
  { href: "/dashboard/settings", label: "Settings", icon: Settings, roles: ['admin', 'hr', 'accountant', 'sales'] },
]

export function DashboardNav() {
  const pathname = usePathname();
  const { role, permissions } = useUser();

  const filteredNavItems = navItems.filter(item => {
    if (!item.roles.includes(role as UserRole)) {
      return false;
    }
    // The main dashboard page is always visible if the role is allowed
    if (item.href === '/dashboard') {
      return true;
    }
    const pageKey = item.href.replace('/dashboard/', '');
    // For admin, all permitted pages are visible
    if (role === 'admin') {
      return true;
    }
    // For other roles, check permissions
    return permissions[role as Exclude<UserRole, 'admin'>]?.[pageKey as any];
  });

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
