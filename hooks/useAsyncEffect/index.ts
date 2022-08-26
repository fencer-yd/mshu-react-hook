import { DependencyList, useEffect } from 'react';
import { isPromise } from '../../utils';

type SingleFunc = (ab: AbortController) => void;
type PromiseFunc = (ab: AbortController) => Promise<void>

export default function useAsyncEffect(
  effect: SingleFunc | PromiseFunc,
  deeps: DependencyList = []
) {
  useEffect(() => {
    const ab = new AbortController();
    const _effect = effect.bind(null, ab);
    if (isPromise(_effect)) {
      new Promise<void>((resolve, reject) => {
        ab.signal.addEventListener('abort', reject);
        (_effect() as unknown as Promise<void>).then().catch();
      }).then()
    } else {
      _effect();
    }

    return () => {
      ab.abort();
    };
  }, deeps);
}
