import { DependencyList, useEffect } from 'react';
import { isPromise } from '../../utils';

export default function useAsyncEffect(
  effect: (ab: AbortController) => void | Promise<void>,
  deeps: DependencyList = []
) {
  useEffect(() => {
    const ab = new AbortController();
    const _effect = effect.bind(null, ab);
    if (isPromise(_effect)) {
      (_effect() as Promise<void>).then().catch();
    } else {
      _effect();
    }

    return () => {
      ab.abort();
    };
  }, deeps);
}
