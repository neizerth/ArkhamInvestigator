import { type PropsWithChildren, type ReactNode, useEffect } from "react";
import { useBoolean } from "../../../lib/hooks/common";
import { delay } from "../../../lib/util/promise";
import * as C from "./Delay.components";

export type DelayProps = PropsWithChildren & {
	delayMs?: number;
	fallback?: ReactNode;
};

export const Delay = ({
	children,
	delayMs = 100,
	fallback = <C.Loader />,
}: DelayProps) => {
	const [show, setShow] = useBoolean(false);

	useEffect(() => {
		delay(delayMs).then(setShow.on);
	}, [setShow.on, delayMs]);

	if (!show) {
		return fallback;
	}

	return children;
};
