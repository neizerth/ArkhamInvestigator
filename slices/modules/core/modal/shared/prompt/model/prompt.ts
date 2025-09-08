import type {
	InputModeOptions,
	KeyboardType,
	TextInputProps,
} from "react-native";
import type { BaseModalData } from "../../base/model";

export type PromptModalData<Action> = BaseModalData<Action> & {
	defaultValue?: string;
	placeholder?: string;
	inputMode?: InputModeOptions;
	keyboardType?: KeyboardType;
	inputProps?: TextInputProps;
	text?: string;
};
