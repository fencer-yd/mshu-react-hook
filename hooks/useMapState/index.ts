import { useMemo, useState } from 'react';
import useToggle from '../useToggle';

function mapCopy<K, V>(map1: Map<K, V>, map2: Map<K, V>) {
  const it = map1.entries();
  let finished: boolean = false;
  do {
    const { value, done } = it.next();
    if (!done) {
      const [k, v] = value;
      map2.set(k, v);
    }
    finished = Boolean(done);
  } while (!finished);
}

export default function useMapState<K, V>(
  initialState: Map<K, V> | ((...params: any[]) => Map<K, V>) = new Map()
): [Map<K, V>, (key: K, value: V) => void, () => void] {
  const [refresh, toggleRefresh] = useToggle(false);
  const [_state] = useState(initialState);

  const state = useMemo(() => _state, [refresh]);

  const setState = (key: K, value: V) => {
    _state.set(key, value);
    toggleRefresh();
  };

  const resetState = () => {
    _state.clear();
    let _initialState = initialState;
    if (typeof initialState === 'function') {
      _initialState = initialState();
    }
    mapCopy<K, V>(_state, _initialState as Map<K, V>);
    toggleRefresh();
  };

  return [state, setState, resetState];
}
