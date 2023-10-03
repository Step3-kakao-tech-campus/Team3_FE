"use client";

import { getCities, getCountries, getDistricts } from "@/apis/district";
import { PageSearchParams } from "@/types/pageSearchParams";
import { useQueries } from "@tanstack/react-query";
import { MdLocationOn } from "react-icons/md";

function SearchedLocationDisplay({ searchParams }: PageSearchParams) {
  const cityId = searchParams?.cityId ? parseInt(searchParams?.cityId, 10) || 0 : 0;
  const countryId = searchParams?.countryId ? parseInt(searchParams?.countryId, 10) || 0 : 0;
  const districtId = searchParams?.districtId ? parseInt(searchParams?.districtId, 10) || 0 : 0;

  const queries = useQueries({
    queries: [
      {
        queryKey: ["cityId"],
        queryFn: getCities,
      },
      {
        queryKey: ["countryId", cityId],
        queryFn: () => {
          return getCountries(cityId);
        },
      },
      {
        queryKey: ["districtId", countryId],
        queryFn: () => {
          return getDistricts(countryId);
        },
      },
    ],
  });

  const cities = queries[0]?.data?.data?.response?.cities || [];
  const countries = queries[1]?.data?.data?.response?.countries || [];
  const districts = queries[2]?.data?.data?.response?.districts || [];

  const cityName = cities.filter((option: { id: number; name: string }) => option.id === cityId)[0]?.name || "전체";
  const countryName =
    countries.filter((option: { id: number; name: string }) => option.id === countryId)[0]?.name || "전체";
  const districtName =
    districts.filter((option: { id: number; name: string }) => option.id === districtId)[0]?.name || "전체";

  const searchedRegion = `${cityName} ${cityName !== "전체" ? countryName : ""} ${
    cityName !== "전체" && countryName !== "전체" ? districtName : ""
  }`;

  return (
    <p className="searched-location flex items-center">
      <MdLocationOn className="inline text-red-500" size={20} />
      {searchedRegion}
    </p>
  );
}

export default SearchedLocationDisplay;
