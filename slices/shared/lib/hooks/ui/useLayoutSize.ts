import type { Box } from "@shared/model";
import { useCallback, useRef, useState } from "react"
import type { LayoutChangeEvent } from "react-native";

type UseLayoutSizeOptions = {
  once?: boolean
}

export const useLayoutSize = <T extends Box | undefined>(
  defaultSize?: T, 
  options: UseLayoutSizeOptions = {}
) => {
  const { once = false } = options;
  const [size, setSize] = useState<Box | undefined>(defaultSize);
  const layoutUpdated = useRef(false);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    if (once && layoutUpdated.current) {
      return;
    }
    layoutUpdated.current = true;
    setSize(e.nativeEvent.layout);
  }, [once]);

  return [size, onLayout] as [
    T extends undefined ? T : Box,
    typeof onLayout
  ];
}