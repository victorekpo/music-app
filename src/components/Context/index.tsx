'use client'

import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers';

const AppContext = createContext({});

export const useCtx = () => useContext(AppContext);

const initialState = {
  songQuery: '',
  artistQuery: '',
  albumQuery: '',
  genreQuery: '',
  quotesQuery: '',
  tagsQuery: '',
  searchResults: [],
  music: {}
}

export const AppContextProvider = ({ music, children }) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, music });

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
