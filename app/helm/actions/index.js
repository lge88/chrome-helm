import { findWebPage } from './findWebPage';
import { displayWebPage } from './displayWebPage';

export const actions = {
  [findWebPage.name]: findWebPage,
  [displayWebPage.name]: displayWebPage
};
