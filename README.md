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
  "source": "bookmakrs",
  "created_time": 1468085042
}
```

### Source
A helm source is an object provides a list of candidate under query. All helm sources is placed under `app/helm/sources` folder. A helm source might implement following methods:

#### `getName() => String` (required)
Unique. It will be used as key in a dictionary.

#### `search(query: String, options: Object, callback: Function) => void` (required)
`callback` has a signature of `(candidates: [Candidate]) => void`. Possible fields in `options` are:
- `limit: Int`: return no more that `limit` items.

#### `getDisplayedName() => String` (optional)
By default it is the same as `getName()`. It will be used in UI.

#### `bootstrap(options: Object) => void` (optional)
This method is call when source is activated.

#### `destroy() => void` (optional)
This method is call when source is deactivated.

### Action
A helm action can be applied on a list of candidates. All helm actions is placed under `app/helm/actions` folder.

#### `getName() => String` (required)
Unique. It will be used as key in a dictionary.

#### `run(candidates: [Candidate], context: Object, callback: Function)` (required)
- `callback` has a signature of `error: String? => void`. If success, `callback` is invoked with `error = null`, otherwise `callback` is invoked with a error message string.
- `context` is an empty object for now. It might be used in the future to pass extra information to action.

#### `shouldRun(candidates: [Candidate]) => Bool` (optional)
Examine the candidate list, descide whether this action can be ran. If it returns `false`, the action won't be presented in the action selection UI.

### Session
A helm session is unique defined by:
- The name of the session.
- A ordered list of `Source`.
- A ordered lsit of `Action`.

Following is an example:
```
{
  "name": "Find web page",
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





