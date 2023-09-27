export default async function getCountries(cityId: string) {
  return fetch(`https://server.jagaldol.dev:8080/api/cities/${cityId}/countries`);
}
