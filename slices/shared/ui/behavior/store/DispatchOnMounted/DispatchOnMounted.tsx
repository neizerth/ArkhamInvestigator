import type { AppActionCreator } from "@shared/model";
import { type PropsWithChildren, useEffect } from "react";
import { useAppDispatch } from "../../../../lib";

export type DispatchOnMountedProps = PropsWithChildren & {
	actionCreator: AppActionCreator<void>;
};

export function DispatchOnMounted({
	actionCreator,
	children,
}: DispatchOnMountedProps) {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(actionCreator());
	}, [dispatch, actionCreator]);

	return children;
}
