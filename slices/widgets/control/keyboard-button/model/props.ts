import type { SkillCheckOperator } from "@modules/board/skill-check/shared/model";
import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
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
		selected?: boolean;
	};
