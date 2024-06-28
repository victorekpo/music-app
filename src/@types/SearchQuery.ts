export interface PossibleQuery {
  artistQuery: string;
  songQuery: string;
  genreQuery: string;
  albumQuery: string;
  tagsQuery: string;
  quotesQuery: string;
}

export type SearchQuery = Partial<PossibleQuery>;