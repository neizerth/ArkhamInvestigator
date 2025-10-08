import { activeOpacity } from "../../config";

export const getActiveOpacity = (active: boolean) => {
	return active ? activeOpacity : 1;
};
