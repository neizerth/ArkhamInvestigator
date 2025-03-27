import type { TouchableOpacityProps } from "@features/haptic";
import type { SkillCheckItem } from "@shared/model";

export type ExpressionDisplayProps = TouchableOpacityProps &
	PropsWithType & {
		data: SkillCheckItem[];
		value?: number;
	};

export type ExpressionDisplayType = "primary" | "secondary";

export type PropsWithType = {
	type?: ExpressionDisplayType;
};
