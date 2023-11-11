import { getCities, getCountries, getDistricts } from "@/apis/district";
import { useQueries } from "@tanstack/react-query";

interface Param {
  cityId: number;
  countryId: number;
}

export default function useRegionQueries(param: Param) {
  return useQueries({
    queries: [
      {
        queryKey: ["cityId"],
        queryFn: getCities,
        cacheTime: Infinity,
        staleTime: Infinity,
      },
      {
        queryKey: ["countryId", param.cityId],
        queryFn: () => {
          return getCountries(param.cityId);
        },
        cacheTime: Infinity,
        staleTime: Infinity,
      },
      {
        queryKey: ["districtId", param.countryId],
        queryFn: () => {
          return getDistricts(param.countryId);
        },
        cacheTime: Infinity,
        staleTime: Infinity,
      },
    ],
  });
}
