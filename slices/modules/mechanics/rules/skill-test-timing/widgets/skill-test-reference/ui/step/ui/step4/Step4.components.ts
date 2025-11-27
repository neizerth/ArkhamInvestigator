import { ChaosBagRevealedToken } from "@modules/chaos-bag/reveal/base/entities/ui";
import { GameText } from "@modules/core/theme/shared/ui";
import { color, size } from "@shared/config";
import { Icon, Row } from "@shared/ui";
import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  padding-top: ${size.gap.default}px
`;

export const Table: typeof View = styled(View)`
  flex: 1;
`;

type TrProps = ViewProps & {
	last?: boolean;
};

export const Tr: FC<TrProps> = styled(Row)`
  ${({ last }: TrProps) =>
		!last &&
		`
    border-bottom-width: 1px;
    border-bottom-color: ${color.title};
  `}
`;

export const Option: typeof Row = styled(Row)`
  align-items: center;
  gap: ${size.gap.small}px;
  padding: 5px 0px;
`;

export const CheckIcon: typeof Icon = styled(Icon)`
  color: ${color.text};
`;

export const Vr: typeof View = styled(View)`
  width: 1px;
`;

type TdProps = ViewProps & {
	width?: number;
};

export const Td: FC<TdProps> = styled(View)`
  align-items: center;
  justify-content: center;
  padding: ${size.gap.small}px ${size.gap.small}px;
  ${({ width }: TdProps) => width && `width: ${width}px;`}
`;

export const Token: typeof ChaosBagRevealedToken = styled(
	ChaosBagRevealedToken,
)`
`;

export const Text: typeof GameText = styled(GameText).attrs({
	componentStyles: {
		icon: {
			top: -1,
			fontSize: 16,
		},
	},
})`
`;

export const Effect: typeof Td = styled(Td)`
  padding-left: ${size.gap.default}px;
  padding-right: 0px;
  gap: ${size.gap.small}px;
  flex: 1;
`;
