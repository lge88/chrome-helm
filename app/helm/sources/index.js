import { TabSource } from './tabs';
import { BookmarkSource } from './bookmarks';

// TODO: move to sessions
export const sources = [
  new TabSource(),
  new BookmarkSource()
];
