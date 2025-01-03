import { RefObject, useCallback, useEffect, useState } from "react"
import { useResize } from "./useResize";
import { IBox } from "@/types/ui";
import { pick } from "ramda";

export const useResizedRect = <T extends HTMLElement>(ref: RefObject<T>) => {
  const [box, setBox] = useState<IBox>();

  const onRectUpdate = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const box = pick(['width', 'height'], rect);

    setBox(box);
  }, [ref]);
  
  useResize(onRectUpdate);

  useEffect(onRectUpdate, [ref, onRectUpdate]);

  return [box, onRectUpdate] as [IBox, () => void];
}