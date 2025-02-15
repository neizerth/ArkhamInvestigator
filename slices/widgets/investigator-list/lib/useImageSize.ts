import { useWindowDimensions } from "react-native";
import { useColumnsCount } from "./useColumnsCount";
import { GAP } from "../config";

export const useImageSize = () => {

  const { width } = useWindowDimensions();
  const columnsCount = useColumnsCount();

  const containerWidth = width - GAP * 2;

  const contentWidth = containerWidth - (columnsCount - 1) * GAP;
  return contentWidth / columnsCount;
}