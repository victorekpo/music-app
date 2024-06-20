'use client'

import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers';
import { SET_SEARCH_QUERY } from './actions';

const AppContext = createContext({});

export const useCtx = () => useContext(AppContext);

const initialState = {
  searchQuery: '',
  queryType: 'song',
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
