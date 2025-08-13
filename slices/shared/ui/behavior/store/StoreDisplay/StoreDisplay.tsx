import type { RootState } from "@shared/model";
import type { PropsWithChildren, ReactNode } from "react";
import type { Selector } from "react-redux";
import { useAppSelector } from "../../../../lib/hooks/store";

export type StoreDisplayProps = PropsWithChildren & {
	selector: Selector<RootState, boolean>;

	fallback?: ReactNode;
};

export const StoreDisplay = ({
	selector,
	fallback,
	children,
}: StoreDisplayProps) => {
	const show = useAppSelector(selector);

	if (!show) {
		return fallback;
	}

	return children;
};
