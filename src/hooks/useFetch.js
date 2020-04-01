import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants/';

const useFetch = (endPoint, page) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(BASE_URL + endPoint + '/?page=' + page);
        setResponse(res.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [endPoint, page]);
  return { response, error, isLoading };
};

export default useFetch;
