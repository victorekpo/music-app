import {
  SET_SONG_QUERY,
  SET_ARTIST_QUERY,
  SET_ALBUM_QUERY,
  SET_GENRE_QUERY,
  SET_TAGS_QUERY,
  SET_QUOTES_QUERY,
  SET_SEARCH_RESULTS
} from "@/components/Context/actions";

export const reducer = (state: Record<string, unknown>, action: { type: string, payload: unknown }) => {
  switch (action.type) {
    case SET_SONG_QUERY:
      return {
        ...state,
        songQuery: action.payload
      }

    case SET_ARTIST_QUERY:
      return {
        ...state,
        artistQuery: action.payload
      }

    case SET_ALBUM_QUERY:
      return {
        ...state,
        albumQuery: action.payload
      }

    case SET_GENRE_QUERY:
      return {
        ...state,
        genreQuery: action.payload
      }

    case SET_TAGS_QUERY:
      return {
        ...state,
        tagsQuery: action.payload
      }

    case SET_QUOTES_QUERY:
      return {
        ...state,
        quotesQuery: action.payload
      }

    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload
      }
    default:
      return state;
  }
}