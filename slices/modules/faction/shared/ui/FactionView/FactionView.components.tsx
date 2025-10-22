import { color, size } from "@shared/config";
import type { PropsWithFaction } from "@shared/model";
import { View, type ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { getFactionColor } from "../../lib";
import { FactionFontIcon } from "../FactionFontIcon";

export type ContainerProps = ViewProps &
	PropsWithFaction & {
		colored?: boolean;
		light?: boolean;
		selected?: boolean;
	};

export const Container: typeof View = styled(View)`
  border-radius: ${size.borderRadius.default}px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: ${color.dark10};
  ${(props: ContainerProps) => css`
    border-color: ${getFactionColor(props)};
  `}
  ${({ selected, ...props }: ContainerProps) =>
		selected &&
		css`
    background-color: ${getFactionColor({
			...props,
			alpha: 0.3,
		})};
  `}
`;

export const Icon: typeof FactionFontIcon = styled(FactionFontIcon)`
`;
