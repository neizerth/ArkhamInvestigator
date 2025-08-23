type Options = {
	unit: number;
	small?: boolean;
};
export const getDescriptionTextSize = ({ unit, small }: Options) => {
	return small ? unit * 0.9 : unit;
};
