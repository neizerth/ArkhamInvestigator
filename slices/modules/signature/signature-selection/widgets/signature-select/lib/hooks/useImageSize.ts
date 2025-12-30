import { useWindowDimensions } from "react-native";
import { GAP } from "../../config";
import { useColumnsCount } from "./useColumnsCount";

export const useImageSize = () => {
	const { width } = useWindowDimensions();
	const columnsCount = useColumnsCount();

	const containerWidth = width - GAP * 2;

	const contentWidth = containerWidth - (columnsCount - 1) * GAP;
	return contentWidth / columnsCount;
};
