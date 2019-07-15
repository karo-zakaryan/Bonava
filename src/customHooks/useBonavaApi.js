import { useState, useEffect } from "react";
import API from "../api";

export const useBonavaApi = (method, endpoint) => {
  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(
    () => {
      const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);

        try {
          const response = await API[method](endpoint);
          setData(response.data);
        } catch (error) {
          setIsError(true);
        }

        setIsLoading(false);
      };

      localStorage.bonavaToken && fetchData();
    },
    [endpoint, method]
  );

  return [{ response: data, isLoading, isError }];
};
