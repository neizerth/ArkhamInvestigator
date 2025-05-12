import { Dimensions } from "react-native";
import { skillCheckBreakpoints } from "../../config";
import type { SkillCheckLayoutType } from "../../model";

const screen = Dimensions.get("screen");

export const useSkillCheckLayoutType = (): SkillCheckLayoutType => {
	return screen.height > skillCheckBreakpoints.medium.height
		? "medium"
		: "small";
};
