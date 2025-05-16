import type { TouchableOpacityProps } from "@features/haptic";
import type { SkillCheckOperator } from "@shared/model";
import type { KeyboardButtonSize, KeyboardButtonType } from "./common";

export type PropsWithKeyboardSize = {
	size?: KeyboardButtonSize;
};

export type PropsWithKeyboardType = {
	buttonType?: KeyboardButtonType;
};

export type KeyboardButtonProps = TouchableOpacityProps &
	PropsWithKeyboardSize &
	PropsWithKeyboardType & {
		value?: number | string;
		operator?: SkillCheckOperator;
	};
