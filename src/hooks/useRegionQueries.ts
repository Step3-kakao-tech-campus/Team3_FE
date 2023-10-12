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
      },
      {
        queryKey: ["countryId", param.cityId],
        queryFn: () => {
          return getCountries(param.cityId);
        },
      },
      {
        queryKey: ["districtId", param.countryId],
        queryFn: () => {
          return getDistricts(param.countryId);
        },
      },
    ],
  });
}
