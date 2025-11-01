import { isValidElement } from "react";
import * as C from "./List.components";

export const isValidListItem = (child: React.ReactNode): boolean => {
	if (!isValidElement(child)) {
		return false;
	}

	return child.type === C.Item;
};
