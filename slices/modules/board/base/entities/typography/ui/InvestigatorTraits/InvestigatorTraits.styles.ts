import { ArnoPro, FZShuTi } from "@assets/fonts";
import { SanCn } from "@assets/fonts";
import { getKeyConfig } from "@shared/lib";
import type { TextStyle } from "react-native";
import { boardText } from "../../config";

type GetInvestigatorTraitsStyleOptions = {
	language: string;
	unit: number;
};
export const getInvestigatorTraitsStyle = ({
	language,
	unit,
}: GetInvestigatorTraitsStyleOptions) => {
	const fontSize = unit * boardText.ratio.traits;
	const zhStyle: TextStyle = {
		fontFamily: FZShuTi.regular,
		fontSize: unit * boardText.ratio.text,
		paddingBottom: 8,
	};
	const getStyle = getKeyConfig<TextStyle>({
		default: {
			fontFamily: ArnoPro.bold,
			fontSize,
		},
		ko: {
			paddingBottom: 5,
			fontFamily: SanCn.bold,
		},
		zh: zhStyle,
		"zh-cn": zhStyle,
	});

	return getStyle(language);
};
