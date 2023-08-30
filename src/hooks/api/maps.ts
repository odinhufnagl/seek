import { useQuery } from '@tanstack/react-query';

import { QUERY_HOOKS } from '../../constants';
import { searchCities } from '../../services/maps';
export const useSearchCities = (searchQuery: string) =>
  useQuery([QUERY_HOOKS.keys.searchLocations, searchQuery], () => searchCities(searchQuery));
