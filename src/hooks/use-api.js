import { useCallback, useMemo, useRef } from "react";

export const useApi = (baseUrl) => {
  const abortControllerRef = useRef(null);

  const cancelRequest = () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
  };

  const sendRequest = useCallback(
    async (path = "", method = "GET", { body, ...otherOptions } = {}) => {
      try {
        cancelRequest();
        abortControllerRef.current = new AbortController();

        const response = await fetch(`${baseUrl}${path}`, {
          method,
          headers: { "Content-Type": "application/json" },
          signal: abortControllerRef.current.signal,
          body: body ? JSON.stringify(body) : undefined,
          ...otherOptions,
        });

        if (!response.ok)
          throw new Error(
            `An issue occured with the API request: ${response.statusText}`
          );
        const data = await (method !== "DELETE"
          ? response.json()
          : response.text());

        return { data, error: null };
      } catch (error) {
        if (error.name === "AbortError") {
          return { data: null, error: null };
        }
        return { data: null, error: error.message };
      }
    },
    [baseUrl]
  );

  const get = useCallback(
    (path = "", options = {}) => sendRequest(path, "GET", options),
    [sendRequest]
  );

  const post = useCallback(
    (path = "", body, options = {}) =>
      sendRequest(path, "POST", { ...options, body }),
    [sendRequest]
  );

  const patch = useCallback(
    (path = "", body, options = {}) =>
      sendRequest(path, "PATCH", { ...options, body }),
    [sendRequest]
  );

  const del = useCallback(
    (path = "", options = {}) => sendRequest(path, "DELETE", options),
    [sendRequest]
  );

  const api = useMemo(
    () => ({
      sendRequest,
      get,
      post,
      patch,
      del,
    }),
    [del, get, patch, post, sendRequest]
  );

  return api;
};
