import { IconButton } from "@features/haptic";
import { skillCheckColor } from "@pages/skill-check/config";
import { color, size } from "@shared/config";
import { Row as BaseRow, Icon } from "@shared/ui";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import TopRule from "./images/rule-top.svg";

export const Container: typeof View = styled(View)`
  padding: 40px ${size.gap.default}px 0;
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

export const CheckIcon: typeof View = styled(View)`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  top: 5px;
  align-items: center;
`;

// export const Rule: typeof Image = styled(Image)
//   .attrs({
//     source: rule,
//     resizeMode: 'contain'
//   })`
//     margin-top: -20px;
//     height: 40px;
//   `

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
