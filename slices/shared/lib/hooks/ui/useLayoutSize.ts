import { Box } from "@shared/model";
import { useCallback, useState } from "react"
import { LayoutChangeEvent } from "react-native";

export const useLayoutSize = (defaultSize: Box) => {
  const [size, setSize] = useState<Box>(defaultSize);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setSize(e.nativeEvent.layout);
  }, []);

  return [size, onLayout] as [Box, typeof onLayout];
}