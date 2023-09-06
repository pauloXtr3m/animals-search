import React, {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';
import { ToastContainer } from '../components/ToastContainer';
import { ChildrenProps } from './index';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const Toast = createContext<ToastContextData>({} as ToastContextData);

function ToastProvider({ children }: ChildrenProps): ReactElement {
  const [messages, setMessages] = useState<ToastMessage[]>([]);
  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages(oldMessages => [...oldMessages, toast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  const contextValue = useMemo(
    () => ({
      removeToast,
      addToast,
    }),
    [removeToast, addToast],
  );

  return (
    <Toast.Provider value={contextValue}>
      {children}
      <ToastContainer messages={messages} />
    </Toast.Provider>
  );
}

function useToast(): ToastContextData {
  const context = useContext(Toast);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
