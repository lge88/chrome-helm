import { findWebPage } from './findWebPage';
import { displayWebPage } from './displayWebPage';
import { findWebPageInNewWindow } from './findWebPageInNewWindow';

export const actions = {
  [findWebPage.name]: findWebPage,
  [displayWebPage.name]: displayWebPage,
  [findWebPageInNewWindow.name]: findWebPageInNewWindow
};
