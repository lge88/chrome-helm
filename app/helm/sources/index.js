import { TabSource } from './tabs';
import { BookmarkSource } from './bookmarks';
import { HistorySource } from './history';
import { GoogleSuggestSource } from './googleSuggest';
import { WebSearchSource } from './webSearch';

export const sources = {
  [TabSource.key]: TabSource,
  [BookmarkSource.key]: BookmarkSource,
  [HistorySource.key]: HistorySource,
  [GoogleSuggestSource.key]: GoogleSuggestSource,
  [WebSearchSource.key]: WebSearchSource
};
