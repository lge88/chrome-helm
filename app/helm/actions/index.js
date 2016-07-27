import { findWebPage } from './findWebPage';
import { displayWebPage } from './displayWebPage';
import { findWebPageInNewWindow } from './findWebPageInNewWindow';
import { addToBookmarks } from './addToBookmarks';
import { removeFromBookmarks } from './removeFromBookmarks';
import { closeTab } from './closeTab';

export const actions = {
  [findWebPage.name]: findWebPage,
  [displayWebPage.name]: displayWebPage,
  [findWebPageInNewWindow.name]: findWebPageInNewWindow,
  [addToBookmarks.name]: addToBookmarks,
  [removeFromBookmarks.name]: removeFromBookmarks,
  [closeTab.name]: closeTab
};
