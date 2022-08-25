import { EMPTY_OBJECT, IReactionPublic } from 'mobx/src/internal';
import { IReactionOptions } from 'mobx';
import useReaction from '../useReaction';
import { useState } from 'react';

export default function useModalVisible<
  FireImmediately extends boolean = false
>(
  expression: (r: IReactionPublic) => boolean,
  onOpen: (ab?: AbortController) => void,
  onClose: () => void,
  opts: IReactionOptions<boolean, FireImmediately> = EMPTY_OBJECT
) {
  const [ab] = useState(() => new AbortController());

  useReaction(
    expression,
    (current, previous) => {
      if (!previous && current) {
        onOpen(ab);
      }
      if (previous && !current) {
        onClose();
        ab.abort();
      }
    },
    opts
  );
}
