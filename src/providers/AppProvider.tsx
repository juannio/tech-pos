import type { ReactNode } from 'react';
import { ThemeProvider } from '../context/ThemeContext';

interface Props {
  children: ReactNode;
}

export function AppProvider({ children }: Props) {
  return (
    <ThemeProvider>
      {/* Add more providers here */}
      {/* <AuthProvider> */}
      {/* <QueryClientProvider client={queryClient}> */}
      {/* <ReduxProvider> */}

      {children}

      {/* </ReduxProvider> */}
      {/* </QueryClientProvider> */}
      {/* </AuthProvider> */}
    </ThemeProvider>
  );
}
