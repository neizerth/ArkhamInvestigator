import { Copasetic, Enthalpy298 } from "@assets/fonts";
import { withLocale } from "@features/i18n";
import { color, font, size } from "@shared/config";
import { type DefinedIconProps, Icon, Row } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { skillCheckColor } from "../../../../../../config";
import { ExpressionDisplay } from "../../../ExpressionDisplay";
import { ExpressionHistoryItemRightActionsMemo as ItemRightActions } from "../ExpressionHistoryItemRightActions";

export const Container: typeof Row = styled(Row)`
  justify-content: flex-end;
  align-items: stretch;
  position: relative;
`;

export const Display: typeof ExpressionDisplay = styled(ExpressionDisplay)`
  padding-top: 3px;
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

export const Title: typeof View = styled(View)`
  position: absolute;
  align-items: center;
  left: 2px;
  top: 10px;
  z-index: 1;
  padding: 2px;
  background-color: ${color.dark20};
  border-radius: 2px;
`;

export const TitleText = withLocale({
	style: {
		default: {
			fontFamily: Copasetic.regular,
			color: color.light10,
			fontSize: font.size.small,
			maxWidth: 80,
		},
		ru: {
			fontFamily: Enthalpy298.regular,
		},
	},
});

export const Item: typeof Row = styled(Row)`
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
