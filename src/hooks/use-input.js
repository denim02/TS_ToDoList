import { useCallback, useMemo, useRef, useState } from "react";

export const useInput = (defaultValue = "") => {
  const inputRef = useRef(null);
  const [inputState, setInputState] = useState(defaultValue);

  const handleChange = useCallback(() => {
    if (!inputRef) throw new Error("Set input ref!");

    setInputState(inputRef.current.value);
  }, []);

  const focusInput = useCallback(() => {
    if (!inputRef) throw new Error("Set input ref!");

    inputRef.current.focus();
  }, []);

  const clearInput = useCallback(() => {
    if (!inputRef) throw new Error("Set input ref!");

    setInputState("");
  }, []);

  const inputHandle = useMemo(
    () => ({
      ref: inputRef,
      value: inputState,
      focusInput,
      clearInput,
      handleChange,
    }),
    [clearInput, focusInput, handleChange, inputState]
  );

  return inputHandle;
};
