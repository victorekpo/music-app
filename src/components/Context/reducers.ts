import { SET_SEARCH_QUERY, SET_SEARCH_QUERY_TYPE, SET_SEARCH_RESULTS } from "@/components/Context/actions";

export const reducer = (state: Record<string, unknown>, action: { type: string, payload: unknown }) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      }

    case SET_SEARCH_QUERY_TYPE:
      return {
        ...state,
        queryType: action.payload
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