import React, { ReactElement, ReactNode } from 'react';
import { SearchProvider } from './search';

export interface ChildrenProps {
  children: ReactNode;
}

export function AppProvider({ children }: ChildrenProps): ReactElement {
  return <SearchProvider>{children}</SearchProvider>;
}
