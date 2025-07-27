import { Copasetic } from "@assets/fonts";
import { IconButton } from "@shared/ui";

import { TouchableOpacity } from "@modules/core/touch/shared/ui";
import { color, size, statusBarHeight } from "@shared/config";
import { Row as BaseRow, Icon, UnscaledText } from "@shared/ui";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { skillCheckColor } from "../../../../config";
import TopRule from "./images/rule-top.svg";

export const Container: typeof View = styled(View)`
  padding: ${statusBarHeight}px ${size.gap.default}px 0;
`;

type ContentProps = ViewProps & {
	border?: boolean;
};
export const Content: FC<ContentProps> = styled(View)`
  align-items: center;
  position: relative;
  ${({ border }: ContentProps) =>
		border &&
		css`
    border-bottom-width: 1px;
    border-bottom-color: ${skillCheckColor.border};
  `}
`;

export const Controls: typeof View = styled(View)`
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export const StatType: typeof TouchableOpacity = styled(TouchableOpacity)`
  position: absolute;
  z-index: 10;
  left: 50%;
  width: 40px;
  margin-left: -20px;
  bottom: 0;
  top: 5px;
  align-items: center;
`;

export const Rule: typeof TopRule = styled(TopRule).attrs({
	height: 40,
	width: 290,
})`
    margin-top: -15px;
    height: 40px;
  `;

export const Stat: typeof Icon = styled(Icon)`
  font-size: 30px;
  color: ${skillCheckColor.checkIcon};
`;

export const Difficulty: typeof UnscaledText = styled(UnscaledText)`
  position: absolute;
  left: 43px;
  top: 15px;
  width: 50px;
  font-size: 20px;
  color: ${skillCheckColor.checkIcon};
  font-family: ${Copasetic.regular};
`;

export const Row: typeof BaseRow = styled(BaseRow)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const HistoryActions: typeof BaseRow = styled(BaseRow)`
  align-items: center;
`;

export const Button: typeof IconButton = styled(IconButton).attrs({
	iconStyle: {
		color: color.light15,
		fontSize: 20,
	},
})`
    
  `;
