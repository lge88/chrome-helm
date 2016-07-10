import * as sessions from './sessions';

export function search(sessionName, query, options, onUpdate) {
  const session = sessions[sessionName];
  if (session) {
    session.search(query, options, onUpdate);
  }
}
