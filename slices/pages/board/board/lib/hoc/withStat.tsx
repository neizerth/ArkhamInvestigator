import { selectPickerScale } from "@modules/core/control/entities/picker/lib";
import { useAppSelector } from "@shared/lib";
import type { FC } from "react";
import type { ViewProps } from "react-native";
import { assetsSize } from "../../config";

export type WithStatOptions = {
	height?: number;
	ratio: number;
};

export function withStat<T extends ViewProps>(
	Component: FC<T>,
	options: WithStatOptions,
) {
	const { ratio } = options;
	const defaultHeight = options.height ?? assetsSize.main;

	const ExtendedComponent: typeof Component = (props) => {
		const scale = useAppSelector(selectPickerScale);
		const height = defaultHeight * scale;

		const width = Math.round(height * ratio);
		const imageStyle = {
			width,
			height,
		};

		const style = {
			width,
			height,
			alignItems: "center",
			justifyContent: "center",
		};

		return (
			<Component
				{...props}
				imageStyle={imageStyle}
				style={[style, props.style]}
			/>
		);
	};

	const displayName = ExtendedComponent.displayName || ExtendedComponent.name;
	ExtendedComponent.displayName = `WithStat(${displayName})`;

	return ExtendedComponent;
}
