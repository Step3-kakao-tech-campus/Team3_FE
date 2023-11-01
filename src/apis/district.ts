import client from "./instance";

export async function getCities() {
  const res = await client.get("/api/cities");
  return res;
}

export async function getCountries(cityId: number) {
  const res = await client.get(`/api/cities/${cityId}/countries`);
  return res;
}

export async function getDistricts(countryId: number) {
  const res = await client.get(`/api/cities/countries/${countryId}/districts`);
  return res;
}

export async function getAllRegions(districtId: number) {
  const res = await client.get(`/api/cities/districts/${districtId}`);
  return res;
}
