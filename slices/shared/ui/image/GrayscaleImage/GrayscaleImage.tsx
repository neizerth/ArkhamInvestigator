import {
	FilterImage,
	type FilterImageProps,
	type Filters,
} from "react-native-svg/filter-image";

export type GrayscaleImageProps = FilterImageProps;

export const GrayscaleImage = (props: GrayscaleImageProps) => {
	const filters: Filters = [
		{
			name: "feColorMatrix",
			type: "saturate",
			values: 0,
		},
	];

	return <FilterImage {...props} filters={filters} />;
};
