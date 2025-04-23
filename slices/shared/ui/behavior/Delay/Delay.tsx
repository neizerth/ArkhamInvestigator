import { type PropsWithChildren, type ReactNode, useEffect } from "react";
import { delay, useBoolean } from "../../../lib";

export type DelayProps = PropsWithChildren & {
	delayMs?: number;
	fallback?: ReactNode;
};

export const Delay = ({ children, delayMs = 0, fallback }: DelayProps) => {
	const [show, setShow] = useBoolean(false);

	useEffect(() => {
		delay(delayMs).then(setShow.on);
	}, [setShow.on, delayMs]);

	if (!show) {
		return fallback;
	}

	return children;
};
