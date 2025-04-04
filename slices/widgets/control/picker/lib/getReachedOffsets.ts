import type { PickerScrollDirection } from "../model/common";

type Options = {
	offsets: number[];
	from: number;
	to: number;
	direction: PickerScrollDirection;
};

export const getReachedOffsets = ({
	from,
	to,
	offsets,
	direction,
}: Options) => {
	switch (direction) {
		case "initial":
			return [];
		case "up":
			return offsets.filter((value) => from <= value && to > value);
		case "down":
			return offsets.filter((value) => to < value && from >= value);
	}
};
