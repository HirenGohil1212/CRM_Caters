"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import type { User, UserRole } from '@/lib/types';
import { users } from '@/lib/data';

interface UserContextType {
  user: User;
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('admin');

  const user = users[role];

  return (
    <UserContext.Provider value={{ user, role, setRole }}>
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
