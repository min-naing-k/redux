import { useCallback, useState } from 'react';
import { useAppDispatch } from './useAppDispatch';

type useThunkReturnType = [runThunkType<unknown>, boolean, object|null];
type runThunkType<T> = (arg?: T) => void;

export const useThunk = <T>(thunk: T): useThunkReturnType => {
  const dispatch = useAppDispatch();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ error, setError ] = useState<object|null>(null);

  const runThunk: runThunkType<unknown> = useCallback((arg?: unknown): void => {
    if (typeof thunk === 'function') {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((err: object|null) => setError(err))
        .finally(() => setIsLoading(false));
    }
  }, [ dispatch, thunk ]);

  return [ runThunk, isLoading, error ];
};