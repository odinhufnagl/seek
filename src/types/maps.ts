export interface LocationFromSearch {
  placeId: string;
  title: string;
}

type Alpha2CountryCode = string;
export type AddressData = {
  country?: { code: Alpha2CountryCode; name: string };
  address?: string;
  city?: string;
  postalCode?: string;
  coordinate: { latitude: number; longitude: number };
};
