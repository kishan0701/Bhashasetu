import React, { createContext, useContext, useState, useCallback } from 'react';
import type { PendingContribution } from '../types';
import { pendingContributions as initialContributions } from '../data/mockData';

interface AppContextType {
  contributions: PendingContribution[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  approveContribution: (id: string) => void;
  rejectContribution: (id: string, notes?: string) => void;
  addContribution: (c: Omit<PendingContribution, 'id' | 'status' | 'dateSubmitted'>) => void;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contributions, setContributions] = useState<PendingContribution[]>(initialContributions);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toast, setToast] = useState<AppContextType['toast']>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const approveContribution = useCallback((id: string) => {
    setContributions(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' as const } : c));
    showToast('Contribution approved successfully!');
  }, [showToast]);

  const rejectContribution = useCallback((id: string, notes?: string) => {
    setContributions(prev => prev.map(c => c.id === id ? { ...c, status: 'rejected' as const, notes } : c));
    showToast('Contribution rejected.', 'info');
  }, [showToast]);

  const addContribution = useCallback((c: Omit<PendingContribution, 'id' | 'status' | 'dateSubmitted'>) => {
    const newC: PendingContribution = {
      ...c,
      id: `pc${Date.now()}`,
      status: 'pending',
      dateSubmitted: new Date().toISOString().split('T')[0],
    };
    setContributions(prev => [newC, ...prev]);
  }, []);

  return (
    <AppContext.Provider value={{
      contributions,
      searchQuery,
      setSearchQuery,
      isSearchOpen,
      setIsSearchOpen,
      approveContribution,
      rejectContribution,
      addContribution,
      toast,
      showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
