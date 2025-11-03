import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DestinationSearch from '../components/DestinationSearch';
import DestinationDetails from '../components/DestinationDetails';

function HomePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  
  const parsedId = id ? parseInt(id, 10) : null;
  const isValidId = parsedId !== null && Number.isInteger(parsedId) && parsedId > 0;
  const selectedDestinationId = isValidId ? parsedId : null;

  useEffect(() => {
    if (id && !isValidId) {
      navigate('/');
    }
  }, [id, isValidId, navigate]);

  const handleDestinationSelect = (destinationId: number) => {
    navigate(`/${destinationId}`);
  };

  const handleNearbyClick = (destinationId: number) => {
    navigate(`/${destinationId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Travel Search: Coding Task
        </h1>
        
        <div className="mb-8">
          <DestinationSearch onSelect={handleDestinationSelect} />
        </div>

        {selectedDestinationId !== null && (
          <div className="mt-8">
            <DestinationDetails 
              destinationId={selectedDestinationId} 
              onNearbyClick={handleNearbyClick}
            />
          </div>
        )}

        {selectedDestinationId === null && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Search for different locations
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage