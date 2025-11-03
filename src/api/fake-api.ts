import { Destination } from '../types';
import { DESTINATIONS } from '../data/destinations';

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  // haversine formula for distance calculation
  const R = 6371; // earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

async function queryDestinations(query: string): Promise<Destination[]> {
  await new Promise(resolve => setTimeout(resolve, 500));

  if (query === 'fail') {
    throw new Error('Backend error');
  }

  return DESTINATIONS.filter(destination =>
    destination.name.toLowerCase().includes(query.toLowerCase())
  );
}

async function queryDestinationById(id: number): Promise<Destination | undefined> {
  await new Promise(resolve => setTimeout(resolve, 500));

  return DESTINATIONS.find(dest => dest.id === id);
}

async function queryNearbyDestinations(
  latitude: number,
  longitude: number,
  excludeId: number,
  limit: number = 5
): Promise<Destination[]> {
  console.log(latitude, longitude, excludeId, limit);
  
  await new Promise(resolve => setTimeout(resolve, 500));

  return DESTINATIONS
    .filter(dest => dest.id !== excludeId)
    .map(dest => ({
      destination: dest,
      distance: calculateDistance(latitude, longitude, dest.latitude, dest.longitude)
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map(item => item.destination);
}

export async function searchDestinations(query: string): Promise<Destination[]> {
  console.log(query);
  
  return queryDestinations(query);
}

export async function getDestinationDetails(id: number): Promise<{ destination: Destination; nearby: Destination[] }> {
  console.log(id);

  const destination = await queryDestinationById(id);

  if (!destination) {
    throw new Error(`Destination with id ${id} not found`);
  }

  const nearbyDestinations = await queryNearbyDestinations(
    destination.latitude,
    destination.longitude,
    destination.id
  );

  return {
    destination,
    nearby: nearbyDestinations
  };
}

