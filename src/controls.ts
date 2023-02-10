import axios, { type AxiosResponse } from "axios";

export const useGetCityById = async (
  name: string
): Promise<AxiosResponse<any, any>> => {
  const API_KEY = "33babf34df7f7a714bc1812bb8445f04";
  return await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}&lang=ru&units=metric`
    )
    .then((response) => response)
    .catch((response) => response.error);
};
