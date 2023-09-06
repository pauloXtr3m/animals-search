import React, { ReactElement, ReactNode } from 'react';
import { SearchProvider } from './search';
import { ToastProvider } from './toast';

export interface ChildrenProps {
  children: ReactNode;
}

export function AppProvider({ children }: ChildrenProps): ReactElement {
  return (
    <ToastProvider>
      <SearchProvider>{children}</SearchProvider>
    </ToastProvider>
  );
}
