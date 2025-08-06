import type { PickPartial } from "@shared/model";
import type { ConfirmModalAction } from "../model";

type ConfirmModalOptions = Omit<
	PickPartial<ConfirmModalAction, "title" | "data">,
	"type"
>;

export const createConfirmModalAction = (
	options: ConfirmModalOptions,
): ConfirmModalAction => ({
	title: "Okay",
	close: true,
	icon: "check",
	data: null,
	primary: true,
	...options,
	type: "confirm",
});
