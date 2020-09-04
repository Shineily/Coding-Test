import { useState, useEffect } from 'react';
import { getData } from '../helpers/getData';

export const useFetchData = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    getData().then((dataFetch) => {
      setState(dataFetch);
    });
  }, []);

  return state;
};
