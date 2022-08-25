import useReaction from '../useReaction';

type Expression = () => boolean;

export default function useLoading(
  expression: Expression,
  callback: (loading: boolean) => void
) {
  useReaction(
    expression,
    (current, prev) => {
      const isLoaded = prev && !current;
      if (isLoaded) {
        callback(false);
      }
    },
    {
      fireImmediately: true,
    }
  );
}
