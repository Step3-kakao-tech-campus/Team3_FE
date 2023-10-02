"use client";

import getCities from "@/apis/getCities";
import getCountries from "@/apis/getCountries";
import getDistricts from "@/apis/getDistricts";
import { PageSearchParams } from "@/types/pageSearchParams";
import { useQueries } from "@tanstack/react-query";

function SearchedLocationDisplay({ searchParams }: PageSearchParams) {
  const cityId = searchParams?.cityId ? parseInt(searchParams?.cityId, 10) || 0 : 0;
  const countryId = searchParams?.countryId ? parseInt(searchParams?.countryId, 10) || 0 : 0;
  const districtId = searchParams?.districtId ? parseInt(searchParams?.districtId, 10) || 0 : 0;

  const queries = useQueries({
    queries: [
      {
        queryKey: ["cityId"],
        queryFn: async () => {
          const response = await getCities();
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        },
      },
      {
        queryKey: ["countryId", cityId],
        queryFn: async () => {
          const response = await getCountries(cityId);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        },
      },
      {
        queryKey: ["districtId", countryId],
        queryFn: async () => {
          const response = await getDistricts(countryId);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        },
      },
    ],
  });

  const cities = queries[0]?.data?.response?.cities || [];
  const countries = queries[1]?.data?.response?.countries || [];
  const districts = queries[2]?.data?.response?.districts || [];

  const cityName = cities.filter((option: { id: number; name: string }) => option.id === cityId)[0]?.name || "전체";
  const countryName =
    countries.filter((option: { id: number; name: string }) => option.id === countryId)[0]?.name || "전체";
  const districtName =
    districts.filter((option: { id: number; name: string }) => option.id === districtId)[0]?.name || "전체";

  const searchedRegion = `${cityName} ${cityName !== "전체" ? countryName : ""} ${
    cityName !== "전체" && countryName !== "전체" ? districtName : ""
  }`;

  return <p>{searchedRegion}</p>;
}

export default SearchedLocationDisplay;
