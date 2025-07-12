import type { CustomModalAction } from "../model";

type Options = Omit<CustomModalAction, "type"> & {
	url: string;
};

export const createCustomModalAction = ({
	url,
	...options
}: Options): CustomModalAction => ({
	...options,
	type: "custom",
});
