# chrome-helm
chrome-helm is a incremental completion and selection narrowing framework for google chrome browser. It allows you quickly search through opened browser tabs, bookmarks, history, web and more.

chrome-helm is inspired by emacs plugin helm https://github.com/emacs-helm/helm.

## Helm API

### Candidate
A helm candidate is an object representing the item to find. The following attributes will be used to render the UI:
- `title: String` (required)
- `thumb: String` (optional): An icon url.
- `detail: String` (optional)

A candidate must also present:
- `source: String` (required): The name of source (consistent with `Source::getName()`) that generates this candidate.

Other than above attributes, a candidate can cantain other optional data fields in order to interact with `Action`. Following is an example candidate (a bookmark item):
```
{
  "title": "GitHub",
  "thumb": "https://github.global.ssl.fastly.net/favicon.ico",
  "detail": "https://github.com/",
  "source": "bookmarks",
  "created_time": 1468085042
}
```

### Source
A helm source is an object provides a list of candidate under query. All helm sources is placed under `app/helm/sources` folder. A helm source might implement following methods:

#### `constructor(options: Object) => void` (optional)

#### `static key: String` (required)
Unique. It will be used as key in a dictionary.

#### `search(query: String, options: Object, callback: Function) => void` (required)
`callback` has a signature of `(candidates: [Candidate]) => void`. Possible fields in `options` are:
- `limit: Int`: return no more that `limit` items.

#### `static displayedName: String` (optional)
It will be used in UI, use `key` if it is not specified.

#### `destroy() => void` (optional)
This method is call when source is deactivated.

### Action
A helm action can be applied on a list of candidates. All helm actions is placed under `app/helm/actions` folder.

#### `name: String` (required)
Unique. It will be used as key in a dictionary.

#### `displayedName: String` (optional)

#### `description: String` (optional)

#### `run(candidates: [Candidate], context: Object, callback: Function)` (required)
`context` is an empty object for now. Might be used to pass extra info in the future.
`callback` has a signature of `error: String? => void`. If success, `callback` is invoked with `error = null`, otherwise `callback` is invoked with a error message string.

#### `canRun(candidates: [Candidate]) => Bool` (optional)
Examine the candidate list, descide whether this action can be ran. If it returns `false`, the action won't be presented in the action selection UI.

### Session
In a helm session user first incrementally select candidate(s) to act on, then select the action to run. All predefined helm sessions is under `app/helm/sessions`.
- `name: String` (required): The unique name of the session.
- `displayedName: String` (optional): The display name of the session, will be used in UI. If not specified, `name` will be used.
- `sources: [String]` (required): A list of source names. Search result will presented in the order of source in the this list.
- `actions: [String]` (required): A list of available action names. Action choices will presented in the order of source in the this list. Default action is the first action in the list.

Example:
```
{
  "name": "findWebPage",
  "displayedName": "Find web page",
  "sources": [
    "tabs",
    "bookmarks",
    "history",
    "google_suggest"
  ],
  "actions": [
    "gotoUrl",
    "closeTabs"
  ]
}
```
