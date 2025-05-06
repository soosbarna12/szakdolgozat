import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import React from 'react';

const queryClient = new QueryClient();

export const renderHookWithQueryClient = <T,>(
    hook: () => T
) => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    return renderHook(hook, { wrapper });
};