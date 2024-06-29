'use client'

import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { reducer } from './reducers';
import { useQuery } from "@apollo/client";
import { GET_ALL_MUSIC_QUERY } from "@/graphql/queries/getMusic";
import { SET_ALL_MUSIC } from "@/components/Context/actions";

const AppContext = createContext({});

export const useCtx = () => useContext(AppContext);

const user = '667ced56d3ac2d92c0fa5326';

const initialState = {
  user,
  songQuery: '',
  artistQuery: '',
  albumQuery: '',
  genreQuery: '',
  quotesQuery: '',
  tagsQuery: '',
  searchResults: [],
  music: undefined
};

export const AppContextProvider = ({ children }) => {
  // prefetch data based on current user
  const { data: musicData } = useQuery(GET_ALL_MUSIC_QUERY, {
    variables: { user }
  });
  const [state, dispatch] = useReducer(reducer, { ...initialState });

  useEffect(() => {
    const cached = localStorage.getItem("musicData");
    if (cached) {
      dispatch({
        type: SET_ALL_MUSIC,
        payload: JSON.parse(cached).getAllMusic
      });
    }
  },[]);

  useEffect(() => {
    if (musicData) {
      dispatch({
        type: SET_ALL_MUSIC,
        payload: musicData.getAllMusic
      });
      localStorage.setItem("musicData", JSON.stringify(musicData));
    }
  },[musicData]);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
