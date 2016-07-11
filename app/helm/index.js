import * as sessions from './sessions';

export function getOrCreateSession(sessionName, callback) {
  // TODO:
  //   - lazily new Session(sessionConfig)
  //   - only after all source bootstrap complete, invoke callback
  const session = sessions[sessionName];
  if (session) {
    callback({
      sessionName: session.getName(),
      sessionDisplayedName: session.getDisplayedName(),
      sourceNames: session.getSourceNames(),
      actionNames: session.getActionNames()
    });
  }
  return callback(null);
}

export function search(sessionName, query, options, onUpdate) {
  const session = sessions[sessionName];
  if (session) {
    session.search(query, options, onUpdate);
  }
}

export function getActionCandidates(sessionName, selectedCandidate, markedCandidates, callback) {
  const session = sessions[sessionName];
  if (session) {
    session.getActionCandidates(selectedCandidate, markedCandidates, callback);
  }
}

export function runAction(sessionName, actionIndex, context, callback) {
  const session = sessions[sessionName];
  if (session) {
    session.runAction(actionIndex, context, callback);
  }
}
