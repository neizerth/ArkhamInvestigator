import { random } from "mathjs";
import { useCallback, useEffect, useRef, useState } from "react";

type Options<T> = {
	data: T[];
	duration?: number;
	enabled?: boolean;
};

const createRandomIndex = (length: number) => () =>
	Math.round(random(0, length));

export const useRandom = <T>({
	data,
	duration,
	enabled = true,
}: Options<T>) => {
	const interval = useRef<NodeJS.Timeout>(null);
	const { length } = data;
	const getIndex = useCallback(() => {
		return createRandomIndex(length);
	}, [length]);

	const defaultIndex = getIndex();

	const [index, setIndex] = useState(defaultIndex);

	useEffect(() => {
		if (!duration) {
			return;
		}

		if (interval.current) {
			clearInterval(interval.current);
		}

		if (!enabled) {
			return;
		}

		setIndex(getIndex());

		interval.current = setInterval(() => {
			setIndex(getIndex());
		}, duration);

		return () => {
			if (interval.current) {
				clearInterval(interval.current);
			}
		};
	}, [getIndex, duration, enabled]);

	const value = data[index];

	return value;
};
