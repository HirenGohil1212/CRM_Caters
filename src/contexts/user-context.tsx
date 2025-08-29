"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { User, UserRole, Permissions } from '@/lib/types';
import { users, initialPermissions } from '@/lib/data';

interface UserContextType {
  user: User;
  role: UserRole;
  setRole: (role: UserRole) => void;
  permissions: Permissions;
  setPermissions: (permissions: Permissions) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('admin');
  const [permissions, setPermissions] = useState<Permissions>(() => {
    if (typeof window !== 'undefined') {
      const savedPermissions = localStorage.getItem('permissions');
      return savedPermissions ? JSON.parse(savedPermissions) : initialPermissions;
    }
    return initialPermissions;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('permissions', JSON.stringify(permissions));
    }
  }, [permissions]);

  const user = users[role];

  return (
    <UserContext.Provider value={{ user, role, setRole, permissions, setPermissions }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
