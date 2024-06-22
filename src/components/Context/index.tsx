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
  searchResults: []
}

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={[state, dispatch]} >
      { children }
    </AppContext.Provider>
  )
};
