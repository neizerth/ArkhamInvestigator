import { Copasetic, Enthalpy298 } from "@assets/fonts";
import { withLocale } from "@features/i18n";
import { color, font, size } from "@shared/config";
import { type DefinedIconProps, Icon, Row } from "@shared/ui";
import type { FC } from "react";
import styled from "styled-components/native";
import { skillCheckColor } from "../../../../../../config";
import { ExpressionDisplay } from "../../../ExpressionDisplay";
import { ExpressionHistoryItemRightActionsMemo as ItemRightActions } from "../ExpressionHistoryItemRightActions";

import { ZhenShuai } from "@assets/fonts";
import { LineSeedKR } from "@assets/fonts/ko/LineSeedKR";
import { TouchableOpacity } from "@features/haptic";

export const Container: typeof Row = styled(Row)`
  justify-content: flex-end;
  align-items: stretch;
  position: relative;
`;

export const Item: typeof TouchableOpacity = styled(TouchableOpacity)`
`;

export const Display: typeof ExpressionDisplay = styled(ExpressionDisplay)`
  transform: translateY(3px);
`;

export const RightActions: typeof ItemRightActions = styled(ItemRightActions)`
`;

export const Pin: FC<DefinedIconProps> = styled(Icon).attrs({
	icon: "pushpin",
})`
  position: absolute;
  right: ${-size.gap.medium}px;
  top: ${-size.gap.small}px;
  color: ${skillCheckColor.checkIcon};
  font-size: 12px;
`;

export const Title: typeof TouchableOpacity = styled(TouchableOpacity)`
  flex-direction: row;
  position: absolute;
  z-index: 1;
  top: 2px;
  bottom: 0;
  left: 0;
  align-items: center;
`;

const zhTextConfig = {
	fontFamily: ZhenShuai.regular,
	letterSpacing: 0.5,
};

export const TitleText = withLocale({
	style: {
		default: {
			fontFamily: Copasetic.regular,
			lineHeight: 25,
			color: color.light10,
			fontSize: font.size.small,
			backgroundColor: color.dark30,
			paddingVertical: 2,
			paddingHorizontal: 5,
			borderRadius: 2,
		},
		ru: {
			fontFamily: Enthalpy298.regular,
		},
		ko: {
			fontFamily: LineSeedKR.regular,
			letterSpacing: -0.5,
		},
		zh: zhTextConfig,
		"zh-cn": zhTextConfig,
	},
});
