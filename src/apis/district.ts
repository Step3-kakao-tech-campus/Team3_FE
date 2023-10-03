export async function getCities() {
  return fetch("https://server.jagaldol.dev:8080/api/cities");
}

export async function getCountries(cityId: number) {
  return fetch(`https://server.jagaldol.dev:8080/api/cities/${cityId}/countries`);
}

export async function getDistricts(countryId: number) {
  return fetch(`https://server.jagaldol.dev:8080/api/cities/countries/${countryId}/districts`);
}
