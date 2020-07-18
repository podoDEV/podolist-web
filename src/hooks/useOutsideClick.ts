import { useEffect, useRef, MutableRefObject } from "react";

export default function useOutsideClick<T extends HTMLElement>(
  targetRef: MutableRefObject<T | null>,
  callback: () => void
) {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const cb = (event: MouseEvent) => {
    targetRef.current && !targetRef.current.contains(event.target as Node) && callbackRef.current();
  };

  useEffect(() => {
    window.addEventListener("click", cb);

    return () => {
      window.removeEventListener("click", cb);
    };
  }, [targetRef]);
}
