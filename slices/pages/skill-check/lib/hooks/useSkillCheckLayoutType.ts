import { useWindowDimensions } from "react-native";
import { skillCheckBreakpoints } from "../../config";
import type { SkillCheckLayoutType } from "../../model";

export const useSkillCheckLayoutType = (): SkillCheckLayoutType => {
	const window = useWindowDimensions();

	return window.height > skillCheckBreakpoints.medium.height
		? "medium"
		: "small";
};
