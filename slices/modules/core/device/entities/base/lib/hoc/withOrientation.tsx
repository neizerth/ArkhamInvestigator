import { selectScreenOrientationType } from "@modules/core/device/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { ComponentType } from "react";

type WithOrientationProps<Props extends object> = {
	PortraitComponent: ComponentType<Props>;
	LandscapeComponent: ComponentType<Props>;
};

export function withOrientation<Props extends object>({
	PortraitComponent,
	LandscapeComponent,
}: WithOrientationProps<Props>) {
	function WithOrientation(props: Props) {
		const orientation = useAppSelector(selectScreenOrientationType);
		const Component =
			orientation === "portrait" ? PortraitComponent : LandscapeComponent;

		return <Component {...props} />;
	}
	const displayName = PortraitComponent.displayName || PortraitComponent.name;
	WithOrientation.displayName = `withOrientation(${displayName})`;
	return WithOrientation;
}
