import { useState, useMemo, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { searchDestinations } from '../api/fake-api';
import { Destination } from '../types';

interface DestinationSearchProps {
  onSelect: (destinationId: number) => void;
}

export default function DestinationSearch({ onSelect }: DestinationSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const activeQueryRef = useRef<string>('');

  const debouncedSearch = useMemo(
    () =>
      debounce(async (searchQuery: string) => {
        if (searchQuery.trim() === '') {
          activeQueryRef.current = '';
          setResults([]);
          setIsLoading(false);
          setError(null);
          setHasSearched(false);
          return;
        }

        activeQueryRef.current = searchQuery;
        setIsLoading(true);
        setError(null);

        try {
          const searchResults = await searchDestinations(searchQuery);
          
          if (activeQueryRef.current === searchQuery) {
            setResults(searchResults);
            setHasSearched(true);
          }
        } catch (err) {
          if (activeQueryRef.current === searchQuery) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            setResults([]);
            setHasSearched(true);
          }
        } finally {
          if (activeQueryRef.current === searchQuery) {
            setIsLoading(false);
          }
        }
      }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  const handleSelect = (destination: Destination | null) => {
    setSelectedDestination(destination);
    if (destination) {
      onSelect(destination.id);
    }
  };

  const handleClear = () => {
    activeQueryRef.current = '';
    setQuery('');
    setSelectedDestination(null);
    setResults([]);
    setError(null);
    setHasSearched(false);
  };

  return (
    <div className="relative w-full max-w-2xl">
      <Combobox 
        value={selectedDestination} 
        onChange={handleSelect}
        onClose={() => setQuery('')}
        by={(a, b) => a?.id === b?.id}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          </div>
          <ComboboxInput
            displayValue={(destination: Destination | null) => destination?.name ?? ''}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for a destination..."
            className="block w-full pl-10 pr-24 py-3 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       text-gray-900 placeholder-gray-400 
                       disabled:bg-gray-50 disabled:cursor-not-allowed"
            aria-label="Search destinations"
          />
          
          {selectedDestination && !isLoading && (
            <button
              onClick={handleClear}
              className="absolute inset-y-0 right-10 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Clear search"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          )}

          {isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm" role="alert">
            {error}
          </div>
        )}

        {(results.length > 0 || (!error && query && !isLoading && hasSearched && results.length === 0)) && (
          <ComboboxOptions
            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg 
                       max-h-60 overflow-auto"
          >
            {results.length === 0 && !error && query && !isLoading && hasSearched && (
              <div className="px-4 py-3 text-gray-500 text-sm">
                No results found
              </div>
            )}
            
            {results.map((destination) => (
              <ComboboxOption
                key={destination.id}
                value={destination}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none
                           data-[focus]:bg-blue-50 border-b border-gray-100 last:border-b-0"
              >
                <div className="font-medium text-gray-900">{destination.name}</div>
                <div className="text-sm text-gray-500">{destination.country}</div>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </Combobox>
    </div>
  );
}