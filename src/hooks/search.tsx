import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';
import { ChildrenProps } from './index';
import api, { Result } from '../services/api';

interface SearchState {
  searchText: string;
  total: number;
  resultList: Result[];
  selectedResult?: Result;
}

interface SearchContextData {
  resultList: Result[];
  total: number;
  handleSearch(searchText: string): Promise<void>;
  loading: boolean;
  selectedResult?: Result;
  setSelectedResult(id: number): void;
  clearResult(): void;
  searchText: string;
}

const Search = createContext<SearchContextData>({} as SearchContextData);

export function SearchProvider({
  children,
}: ChildrenProps): React.ReactElement {
  const [data, setData] = useState<SearchState>({} as SearchState);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async (searchText: string) => {
    setLoading(true);
    try {
      const response = await api.search(searchText);

      setData({
        searchText,
        total: response.length,
        resultList: response,
        selectedResult: undefined,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResult = useCallback(() => {
    setData(d => ({ ...d, selectedResult: undefined }));
  }, []);

  const setSelectedResult = useCallback(
    (id: number) => {
      const resultItem = data.resultList.find(r => r.id === id);

      return setData(d => ({ ...d, selectedResult: resultItem }));
    },
    [data.resultList, setData],
  );

  const contextValue = useMemo(
    () => ({
      resultList: data.resultList,
      total: data.total,
      handleSearch,
      loading,
      selectedResult: data.selectedResult,
      setSelectedResult,
      searchText: data.searchText,
      clearResult,
    }),
    [
      data.resultList,
      data.total,
      handleSearch,
      loading,
      setSelectedResult,
      data.selectedResult,
      data.searchText,
      clearResult,
    ],
  );

  return <Search.Provider value={contextValue}>{children}</Search.Provider>;
}

export const useSearch = (): SearchContextData => {
  const context = useContext(Search);

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context;
};
