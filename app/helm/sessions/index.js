import { Session } from './Session';

export const findTab = new Session({
  name: 'findTab',
  displayedName: 'Find browser tab',
  sources: [ 'tabs' ],
  actions: [ 'findWebPage' ]
});

export const findWebPage = new Session({
  name: 'findWebPage',
  displayedName: 'Find web page',
  sources: [ 'tabs', 'bookmarks' ],
  actions: [ 'findWebPage' ]
});
