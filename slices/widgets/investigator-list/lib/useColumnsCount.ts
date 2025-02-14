import { useWindowDimensions } from "react-native"
import { GAP, IMAGE_SIZE } from "../config";

export const useColumnsCount = () => {
  const { width } = useWindowDimensions();

  const padding = GAP * 2;

  const count = Math.floor(
    (width - padding) / (IMAGE_SIZE + GAP) 
  );

  return count;
}