import type { RootState } from "@shared/model";
import type { PropsWithChildren } from "react";
import type { Selector } from "react-redux";
import { useAppSelector } from "../../../lib/hooks/store";

export type StoreDisplayProps = PropsWithChildren & {
	selector: Selector<RootState, boolean>;
};

export const StoreDisplay = ({ selector, children }: StoreDisplayProps) => {
	const show = useAppSelector(selector);

	if (!show) {
		return null;
	}

	return children;
};
