import { sources } from './sources';

export function search(query, options, onUpdate) {
  sources.forEach(source => {
    source.search(query, {}, candidates => {
      onUpdate({
        source: source.getDisplayedName(),
        candidates
      });
    });
  });
}
