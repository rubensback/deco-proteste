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
      const { data: newConcelho } = await api.post('/concelhos', concelho);

      setData(state => [...state, newConcelho]);

      return newConcelho;
    } catch (error) {
      alert('Something went wrong, please try again.');
      console.error(error);
      return null;
    }
  }, []);

  const editConcelho = useCallback(async concelho => {
    try {
      const { data: newConcelho } = await api.put(
        `/concelhos/${concelho.id}`,
        concelho,
      );

      setData(state =>
        state.map(c => {
          if (c.id === concelho.id) return concelho;
          return c;
        }),
      );

      return newConcelho;
    } catch (error) {
      alert('Something went wrong, please try again.');
      console.error(error);
      return null;
    }
  }, []);

  const deleteConcelhos = useCallback(async concelhos => {
    try {
      await Promise.all(
        concelhos.map(concelho => api.delete(`/concelhos/${concelho.id}`)),
      );

      const idsToRemove = concelhos.map(concelho => concelho.id);

      setData(state =>
        state.filter(item => idsToRemove.indexOf(item.id) === -1),
      );
    } catch (error) {
      alert('Something went wrong, please try again.');
      console.error(error);
    }
  }, []);

  return (
    <ConcelhosContext.Provider
      value={{
        concelhos: data,
        loadConcelhos,
        addConcelho,
        editConcelho,
        deleteConcelhos,
      }}
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
