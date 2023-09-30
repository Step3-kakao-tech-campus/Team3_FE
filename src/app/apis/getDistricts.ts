export default async function getDistricts(countryId: number) {
  return fetch(`https://server.jagaldol.dev:8080/api/cities/countries/${countryId}/districts`);
}
