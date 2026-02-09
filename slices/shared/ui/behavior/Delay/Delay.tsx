import {
	type PropsWithChildren,
	type ReactNode,
	memo,
	useEffect,
	useRef,
	useState,
} from "react";
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
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => setShow(true), delayMs);
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [delayMs]);

	if (!show) {
		return fallback;
	}

	return children;
};

export const Delay = memo(DelayComponent);
