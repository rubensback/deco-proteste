import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

const ConcelhosContext = createContext({});

export const ConcelhosProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const loadConcelhos = useCallback(async () => {
    try {
      const concelhos = await api.get('/concelhos');

      setData(concelhos.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addConcelho = useCallback(async concelho => {
    try {
      await api.post('/concelhos', concelho);

      setData(state => [...state, concelho]);

      return concelho;
    } catch (error) {
      alert('Something went wrong, please try again.');
      console.error(error);
      return null;
    }
  }, []);

  return (
    <ConcelhosContext.Provider
      value={{ concelhos: data, loadConcelhos, addConcelho }}
    >
      {children}
    </ConcelhosContext.Provider>
  );
};

export const useConcelhos = () => {
  const context = useContext(ConcelhosContext);

  if (!context) {
    throw new Error('useConcelhos must be used within an ConcelhosContext');
  }

  return context;
};
