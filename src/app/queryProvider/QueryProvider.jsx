'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
const queryClient = new QueryClient()

const QueryProvider = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>

    );
};

export default QueryProvider;