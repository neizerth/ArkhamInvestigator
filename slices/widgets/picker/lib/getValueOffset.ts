import { getValueIndex } from "./getValueIndex";

type Options = {
	value?: number;
	data: number[];
	itemHeight: number;
};
export const getValueOffset = ({ value, data, itemHeight }: Options): number =>
	getValueIndex({ value, data }) * itemHeight;
