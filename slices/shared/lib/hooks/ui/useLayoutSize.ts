import type { Box } from "@shared/model";
import { useCallback, useState } from "react"
import type { LayoutChangeEvent } from "react-native";

export const useLayoutSize = <T extends Box | undefined>(defaultSize?: T) => {
  const [size, setSize] = useState<Box | undefined>(defaultSize);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setSize(e.nativeEvent.layout);
  }, []);

  return [size, onLayout] as [
    T extends undefined ? T : Box,
    typeof onLayout
  ];
}