import { useEffect } from 'react';
import { IReactionDisposer, IReactionOptions, reaction } from 'mobx';
import { EMPTY_OBJECT, IReactionPublic } from 'mobx/src/internal';

export default function useReaction<T, FireImmediately extends boolean = false>(
  expression: (r: IReactionPublic) => T,
  effect: (
    arg: T,
    prev: FireImmediately extends true ? T | undefined : T,
    r: IReactionPublic
  ) => void,
  opts: IReactionOptions<T, FireImmediately> = EMPTY_OBJECT
) {
  useEffect(() => {
    const disposer: IReactionDisposer = reaction(expression, effect, opts);
    return () => {
      disposer();
    };
  }, []);
}
