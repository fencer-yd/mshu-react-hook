import { DependencyList, useEffect } from 'react';
import useAsyncFn from '../useAsyncFn';

export type FunctionReturningPromise = (...args: any[]) => Promise<any>;

export { AsyncState, AsyncFnReturn } from '../useAsyncFn';

export default function useAsync<T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList = []
) {
  const [state, callback] = useAsyncFn(fn, deps, {
    loading: true,
  });

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
}
