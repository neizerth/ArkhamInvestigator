import type { FC } from "react";
import styled from "styled-components/native";
import {
	ImageBackground,
	type ImageBackgroundProps,
} from "../../ui/image/ImageBackground";

export type WithBackgroundComponentProps = ImageBackgroundProps;

export const withImageBackground = (props: ImageBackgroundProps = {}) => {
	const Component: FC<ImageBackgroundProps> = styled(ImageBackground).attrs(
		props,
	)`
      justify-content: center;
      align-items: center;
    `;

	const displayName = Component.displayName || Component.name;
	Component.displayName = `WithImageBackground(${displayName})`;

	return Component;
};
