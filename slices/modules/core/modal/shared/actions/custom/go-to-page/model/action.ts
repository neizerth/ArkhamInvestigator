import type { Href } from "expo-router";
import type { CustomModalAction } from "../../base/model";

export type GoToPageModalAction = CustomModalAction & {
	href: Href;
	replace?: boolean;
};
