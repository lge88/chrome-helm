import { TabSource } from './tabs';
import { BookmarkSource } from './bookmarks';
import { GoogleSuggestSource } from './googleSuggest';
import { WebSearchSource } from './webSearch';

export const sources = {
  [TabSource.key]: TabSource,
  [BookmarkSource.key]: BookmarkSource,
  [GoogleSuggestSource.key]: GoogleSuggestSource,
  [WebSearchSource.key]: WebSearchSource
};
