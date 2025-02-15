import { useWindowDimensions } from "react-native"
import { GAP, MAX_IMAGE_SIZE, MIN_COLUMNS } from "../config";

export const useColumnsCount = () => {
  const { width } = useWindowDimensions();

  const padding = GAP * 2;

  const count = Math.floor(
    (width - padding) / (MAX_IMAGE_SIZE + GAP) 
  );

  return Math.max(count, MIN_COLUMNS);
}