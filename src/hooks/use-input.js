import { useCallback, useMemo, useRef, useState } from "react";

export const useInput = (defaultValue = "", validationCallback) => {
  const inputRef = useRef(null);
  const [inputState, setInputState] = useState({
    value: defaultValue,
    error: null,
  });

  const handleChange = useCallback(() => {
    if (!inputRef.current) throw new Error("Set input ref!");

    setInputState({
      value: inputRef.current.value,
      error: validationCallback
        ? validationCallback(inputRef.current.value)
        : null,
    });
  }, []);

  const focusInput = useCallback(() => {
    if (!inputRef.current) throw new Error("Set input ref!");

    inputRef.current.focus();
  }, []);

  const clearInput = useCallback(() => {
    if (!inputRef.current) throw new Error("Set input ref!");

    setInputState({ value: "", error: null });
  }, []);

  const inputHandle = useMemo(
    () => ({
      ref: inputRef,
      value: inputState.value,
      error: inputState.error,
      focusInput,
      clearInput,
      handleChange,
    }),
    [clearInput, focusInput, handleChange, inputState.value, inputState.error]
  );

  return inputHandle;
};
