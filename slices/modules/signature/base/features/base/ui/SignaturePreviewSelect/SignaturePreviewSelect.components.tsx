import {
	TouchableOpacity,
	type TouchableOpacityProps,
} from "@modules/core/touch/shared/ui";
import { color, size } from "@shared/config";
import { Icon } from "@shared/ui";
import { ScrollView } from "@shared/ui";
import type { FC } from "react";
import { View } from "react-native";
import styled, { css } from "styled-components/native";

export const Container: typeof View = styled(View)`
  
`;

export const List: typeof ScrollView = styled(ScrollView).attrs({
	contentContainerStyle: {
		gap: size.gap.default,
	},
})`
    flex-direction: row;
    flex-wrap: wrap;
  `;

export type EmptyProps = TouchableOpacityProps & {
	selected?: boolean;
	size: number;
};

export const Empty: FC<EmptyProps> = styled(TouchableOpacity)`
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
  border: 1px solid ${color.dark15};
  ${({ selected }: EmptyProps) =>
		selected &&
		css`
    border-width: 5px;
  `}
   ${({ size }: EmptyProps) =>
			css`
    width: ${size}px;
  `}
`;

export const EmptyIcon: typeof Icon = styled(Icon)`
  font-size: 32px;
  color: ${color.dark20};
`;
