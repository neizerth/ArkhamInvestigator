import type { FC } from "react";
import styled from "styled-components/native";
import { assetsSize } from "../../config";

export type WithStatOptions = {
	height?: number;
	ratio: number;
};
export const withStat = <T>(Component: FC<T>, options: WithStatOptions) => {
	const { height = assetsSize.main, ratio } = options;
	const width = height * ratio;
	const ExtendedComponent: typeof Component = styled(Component).attrs({
		imageStyle: {
			width,
			height,
		},
	})`
      width: ${width}px;
      height: ${height}px;
      align-items: center;
      justify-content: center;
    `;

	const displayName = ExtendedComponent.displayName || ExtendedComponent.name;
	ExtendedComponent.displayName = `WithStat(${displayName})`;

	return ExtendedComponent;
};
