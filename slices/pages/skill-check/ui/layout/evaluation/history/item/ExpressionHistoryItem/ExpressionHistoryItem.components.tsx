import { withLocale } from "@modules/core/i18n/shared/lib";
import { type DefinedIconProps, Icon, Row } from "@shared/ui";
import type { FC } from "react";
import styled, { css } from "styled-components/native";
import { skillCheckColor } from "../../../../../../config";
import { ExpressionDisplay } from "../../../ExpressionDisplay";
import { ExpressionHistoryItemRightActionsMemo as ItemRightActions } from "../ExpressionHistoryItemRightActions";

import { TouchableOpacity } from "@modules/core/touch/shared/ui";

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
  ${({ theme: { size } }) => css`
  position: absolute;
  right: ${-size.gap.medium}px;
  top: ${-size.gap.small}px;
  color: ${skillCheckColor.checkIcon};
  font-size: 12px;
`}`;

export const Title: typeof TouchableOpacity = styled(TouchableOpacity)`
  flex-direction: row;
  position: absolute;
  z-index: 1;
  top: 2px;
  bottom: 0;
  left: 0;
  align-items: center;
`;

const TitleTextBase = withLocale({
	style: ({ fontFamily }) => ({
		default: {
			fontFamily: fontFamily.Enthalpy298.regular,
			lineHeight: 25,
			paddingVertical: 2,
			paddingHorizontal: 5,
			borderRadius: 2,
			maxWidth: 250,
		},
		ko: {
			fontFamily: fontFamily.LineSeedKR.regular,
			letterSpacing: -0.5,
		},
		zh: {
			fontFamily: fontFamily.ZhenShuai.regular,
			letterSpacing: 0.5,
		},
	}),
});

export const TitleText = styled(TitleTextBase)`
	${({ theme: { color, font } }) => css`
		color: ${color.light10};
		font-size: ${font.size.small}px;
		background-color: ${color.dark30};
	`}
`;
