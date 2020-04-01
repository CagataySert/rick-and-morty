import { useEffect, useState } from 'react';
import axios from 'axios';

const useSimultaneousFetch = urls => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.all(urls.map(url => axios.get(url)));
        setResponse(res);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    if (urls) {
      fetchData();
    }
  }, [urls]);
  return { response, error, isLoading };
};

export default useSimultaneousFetch;
