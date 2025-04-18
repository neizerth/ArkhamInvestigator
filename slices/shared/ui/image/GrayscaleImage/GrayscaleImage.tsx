import { pick } from "ramda";
import {
	FilterImage,
	type FilterImageProps,
	type Filters,
} from "react-native-svg/filter-image";
import { useSource } from "./useSource";
export type GrayscaleImageProps = FilterImageProps;

export const GrayscaleImage = ({ ...props }: GrayscaleImageProps) => {
	const [asset] = useSource(props.source);

	const filters: Filters = [
		{
			name: "feColorMatrix",
			type: "saturate",
			values: 0,
		},
	];

	if (!asset) {
		return null;
	}

	const source = pick(["uri"], asset);

	return <FilterImage {...props} source={source} filters={filters} />;
};
