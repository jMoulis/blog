import { useState, useEffect } from 'react';
import storage from 'services/storage';

const useAuth = ({ fetchLoggedUserAction }) => {
  const [isLogging, setLogging] = useState(true);
  let timer = null;
  useEffect(() => {
    setLogging(true);
    if (storage.get('token')) {
      fetchLoggedUserAction();
    }
    timer = window.setTimeout(() => {
      setLogging(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return isLogging;
};

export default useAuth;
