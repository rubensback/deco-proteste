import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

const ConcelhosContext = createContext({});

export const ConcelhosProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const loadConcelhos = useCallback(async () => {
    try {
      const concelhos = await api.get('/concelho');

      setData(concelhos.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <ConcelhosContext.Provider value={{ concelhos: data, loadConcelhos }}>
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
