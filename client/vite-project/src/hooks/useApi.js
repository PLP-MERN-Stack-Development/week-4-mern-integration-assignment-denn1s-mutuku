import { useState, useEffect } from 'react';

export default function useApi(apiFunc, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    apiFunc()
      .then(res => isMounted && setData(res.data))
      .catch(err => isMounted && setError(err.message || 'Error'))
      .finally(() => isMounted && setLoading(false));
    return () => { isMounted = false };
  }, deps);

  return { data, loading, error };
}
