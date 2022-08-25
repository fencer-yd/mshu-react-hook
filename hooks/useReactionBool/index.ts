import { EMPTY_OBJECT, IReactionPublic } from 'mobx/src/internal';
import { IReactionOptions } from 'mobx';
import { useState } from 'react';
import useReaction from '../useReaction';

export default function useReactionBool<
  FireImmediately extends boolean = false
>(
  expression: (r: IReactionPublic) => boolean,
  start: (ab?: AbortController) => void,
  stop: () => void,
  opts: IReactionOptions<boolean, FireImmediately> = EMPTY_OBJECT
) {
  const [ab] = useState(() => new AbortController());

  useReaction(
    expression,
    (current, previous) => {
      if (!previous && current) {
        start(ab);
      }
      if (previous && !current) {
        stop();
        ab.abort();
      }
    },
    opts
  );
}
