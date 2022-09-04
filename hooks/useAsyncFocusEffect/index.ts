import { DependencyList, useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export default function useAsyncFocusEffect(
  callback: (ab: AbortController) => void,
  deeps: DependencyList = []
) {
  const [ab] = useState(() => new AbortController());
  const navigation = useNavigation();
  useEffect(() => {
    const dispose = navigation.addListener('beforeRemove', () => {
      ab.abort();
    });
    return () => {
      ab.abort();
      dispose();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      callback(ab);
    }, deeps)
  );
}
