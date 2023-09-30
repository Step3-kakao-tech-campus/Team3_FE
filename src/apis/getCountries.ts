export default async function getCountries(cityId: number) {
  return fetch(`https://server.jagaldol.dev:8080/api/cities/${cityId}/countries`);
}
