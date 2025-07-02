
import { useState, useCallback } from 'react';
import { aiService, QueryRequest, QueryResponse } from '@/services/aiService';

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendQuery = useCallback(async (request: QueryRequest): Promise<QueryResponse | QueryResponse[] | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await aiService.sendQuery(request);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getProviders = useCallback(() => {
    return aiService.getProviders();
  }, []);

  const updateProvider = useCallback((id: string, updates: any) => {
    aiService.updateProvider(id, updates);
  }, []);

  return {
    sendQuery,
    getProviders,
    updateProvider,
    isLoading,
    error
  };
};
