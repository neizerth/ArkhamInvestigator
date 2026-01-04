import {
	type PropsWithChildren,
	type ReactNode,
	memo,
	useEffect,
	useState,
} from "react";
import { delay } from "../../../lib/util/promise";
import * as C from "./Delay.components";

export type DelayProps = PropsWithChildren & {
	delayMs?: number;
	fallback?: ReactNode;
};

const DelayComponent = ({
	children,
	delayMs = 100,
	fallback = <C.Loader />,
}: DelayProps) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		delay(delayMs).then(() => setShow(true));
	}, [delayMs]);

	if (!show) {
		return fallback;
	}

	return children;
};

export const Delay = memo(DelayComponent);
