import type { PickPartial } from "@shared/model";
import type { ConfirmModalAction } from "../model";

type ConfirmModalOptions = Omit<
	PickPartial<ConfirmModalAction, "title" | "data">,
	"type" | "primary"
>;

export const createConfirmModalAction = (
	options: ConfirmModalOptions,
): ConfirmModalAction => ({
	title: "Okay",
	close: true,
	...options,
	type: "confirm",
	primary: true,
	data: null,
});
