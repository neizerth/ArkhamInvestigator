import type { RootState } from "@shared/model";
import { type FC, Fragment, type PropsWithChildren } from "react";
import type { Selector } from "react-redux";
import { useAppSelector } from "../../../../lib";
export type StoreDisplayProps = PropsWithChildren & {
	selector: Selector<RootState, boolean>;

	fallback?: FC;
};

export const StoreDisplay = ({
	selector,
	fallback: Fallback = Fragment,
	children,
}: StoreDisplayProps) => {
	const show = useAppSelector(selector);

	if (!show) {
		return <Fallback />;
	}

	return children;
};
