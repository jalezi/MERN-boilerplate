/* eslint-disable react-hooks/exhaustive-deps */
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

import { useState, useEffect } from 'react';

const useFetch = ({ url, options = { method: 'GET' } }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url, { ...options });
        const json = await res.json();
        setResponse(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { response, error, isLoading };
};

export default useFetch;
