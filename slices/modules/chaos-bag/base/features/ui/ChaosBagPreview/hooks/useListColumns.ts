import { size } from "@shared/config";
import { useWindowDimensions } from "react-native";

export const useListColumns = () => {
	const window = useWindowDimensions();
	const width = window.width - size.gap.default * 4;
	const tokenSize = 64;
	const columns = Math.round(width / tokenSize);

	return columns;
};
