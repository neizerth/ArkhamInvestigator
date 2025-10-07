import { selectPickerScale } from "@modules/core/control/entities/picker/lib";
import { useAppSelector } from "@shared/lib";
import { Value, type ValueProps, defaultValueFontSizes } from "@shared/ui";

export type BoardValueProps = ValueProps;

export const BoardValue = (props: BoardValueProps) => {
	const scale = useAppSelector(selectPickerScale);

	const sizesProp = props.sizes ?? defaultValueFontSizes;
	const sizes = sizesProp.map((size) => size * scale);

	return <Value {...props} sizes={sizes} />;
};
