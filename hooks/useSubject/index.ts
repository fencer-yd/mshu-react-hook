import { SingleSubject } from "mstech-subject";
import { BaseObservable as IBaseObservable } from "mstech-subject/SingleSubject";
import {useCallback, useEffect, useState} from "react";
import { Subscription } from "rxjs";

type TypeFunc = () => string;
type Type = string;
interface BaseObservable<T> {
  type: Type | TypeFunc,
  payload: T;
}

export default function useSubject<T>(
  type: Type | TypeFunc,
  callback: (data: T) => void
) {
  const [subscribe, setSubscribe] = useState<Subscription | null>(null);

  const observer = useCallback(
    ({ type: actionType, payload }: BaseObservable<T>) => {
      let _type: Type;
      if (typeof type === 'function') {
        _type = type();
      } else {
        _type = type;
      }
      if (_type === actionType) {
        callback(payload)
      }
    },
    []
  );

  function remove() {
    if (subscribe) {
      SingleSubject.delete(subscribe);
      setSubscribe(null);
    }
  }

  function reConnect() {
    if (!subscribe) {
      const _subscribe = SingleSubject.add({
        next: observer as (ob: IBaseObservable) => void,
        error: () => {},
        complete: () => {},
      });
      setSubscribe(_subscribe);
    }
  }

  useEffect(() => {
    reConnect();
    return () => {
      remove();
    };
  }, [])
}