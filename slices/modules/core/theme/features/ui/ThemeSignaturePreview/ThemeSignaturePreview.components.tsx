import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import {
	FactionView,
	type FactionViewProps,
} from "@modules/faction/entities/ui";
import type { FC } from "react";
import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

type PropsWithSize = {
	size: number;
};

type PlaceholderProps = PropsWithSize & TouchableOpacityProps;

export const Placeholder: FC<PlaceholderProps> = styled(TouchableOpacity)`
  ${({ size }: PropsWithSize) => css`
    width: ${size}px;
  `}
`;

type FactionProps = PropsWithSize & FactionViewProps;

export const Faction: FC<FactionProps> = styled(FactionView).attrs({
	contentContainerStyle: {
		flex: 1,
	},
})`
  ${({ size }: PropsWithSize) => css`
    font-size: ${size / 2}px;
  `}
`;
