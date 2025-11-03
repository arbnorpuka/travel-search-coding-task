import { useQuery } from '@tanstack/react-query';
import { MapPinIcon, GlobeAltIcon, CloudIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { getDestinationDetails } from '../api/fake-api';

interface DestinationDetailsProps {
  destinationId: number;
  onNearbyClick: (destinationId: number) => void;
}

export default function DestinationDetails({ destinationId, onNearbyClick }: DestinationDetailsProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['destination', destinationId],
    queryFn: () => getDestinationDetails(destinationId),
    enabled: !!destinationId,
  });

  const destination = data?.destination;
  const nearby = data?.nearby || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg" role="alert">
        <p className="text-red-800 font-medium">Error loading destination</p>
        <p className="text-red-600 text-sm mt-1">{error instanceof Error ? error.message : 'An error occurred'}</p>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-600">No destination selected</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-8 border-b border-gray-200">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{destination.name}</h2>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPinIcon className="w-5 h-5 mr-2 text-blue-500" />
            <span className="text-sm">{destination.country}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CloudIcon className="w-5 h-5 mr-2 text-blue-500" />
            <span className="text-sm">{destination.climate}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CurrencyDollarIcon className="w-5 h-5 mr-2 text-blue-500" />
            <span className="text-sm">{destination.currency}</span>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">{destination.description}</p>
      </div>

      <div className="p-8">
        <div className="flex items-center mb-6">
          <GlobeAltIcon className="w-6 h-6 text-blue-500 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">Nearby Destinations</h3>
        </div>

        {nearby.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearby.map((nearbyDest) => (
              <button
                key={nearbyDest.id}
                onClick={() => onNearbyClick(nearbyDest.id)}
                className="text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 
                         hover:shadow-md transition-all duration-200 group"
              >
                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-1">
                  {nearbyDest.name}
                </h4>
                <p className="text-sm text-gray-500 mb-2">{nearbyDest.country}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{nearbyDest.description}</p>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No nearby destinations found</p>
        )}
      </div>
    </div>
  );
}

