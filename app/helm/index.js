import * as sessionConfigs from './sessions';
import { Session } from './sessions/Session';

let sessions = {};
function getSessionInfo(session) {
  return {
    sessionName: session.getName(),
    sessionDisplayedName: session.getDisplayedName(),
    sourceNames: session.getSourceNames(),
    actions: session.getActions()
  };
}

export function getOrCreateSession(sessionName, callback) {
  let session = sessions[sessionName] || null;
  if (session) {
    callback(getSessionInfo(session));
  } else {
    const config = sessionConfigs[sessionName];
    if (!config) {
      callback(null);
      return;
    }

    session = new Session(config);
    session.bootstrap(() => {
      sessions[sessionName] = session;
      callback(getSessionInfo(session));
    });
  }
  window.HelmSession = session;
}

export function search(sessionName, query, options, onUpdate, onComplete) {
  const session = sessions[sessionName];
  if (session) {
    session.search(query, options, onUpdate, onComplete);
  }
}

export function getActionCandidates(sessionName, selectedCandidate, markedCandidates, callback) {
  const session = sessions[sessionName];
  if (session) {
    session.getActionCandidates(selectedCandidate, markedCandidates, callback);
  }
}

export function runAction(sessionName, actionIndex, candidates, context, callback) {
  const session = sessions[sessionName];
  if (session) {
    session.runAction(actionIndex, candidates, context, callback);
  }
}

export function runDefaultAction(sessionName, candidates, context, callback) {
  const session = sessions[sessionName];
  if (session) {
    session.runDefaultAction(candidates, context, callback);
  }
}

export function runPersistentAction(sessionName, candidates, context, callback) {
  const session = sessions[sessionName];
  if (session) {
    session.runPersistentAction(candidates, context, callback);
  }
}

// Hacky, updated current window { focused: false } won't work.
function getLastFocused(callback) {
  chrome.windows.getAll({ populate: true }, function(wins) {
    for (let i = 0; i < wins.length; ++i) {
      if (wins[i].tabs.length > 0 && wins[i].tabs[0].title !== 'Chrome Helm') {
        callback(wins[i]);
        return;
      }
    }
    callback(null);
  });
}

export function gotoLastFocused() {
  getLastFocused(function(win) {
    chrome.windows.update(win.id, { focused: true });
  });
}
