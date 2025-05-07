import { useCallback, useEffect, useState } from "react";
import { delay } from "../../util";

type Options<T> = {
	delay?: number;
	delayIn?: number;
	delayOut?: number;
	status?: boolean;
	valueIn: T;
	valueOut: T;
};
export const useDelayedValue = <T>({
	status = false,
	valueIn,
	valueOut,
	delay: delayProp = 0,
	delayIn,
	delayOut,
}: Options<T>) => {
	const getValue = useCallback(
		(status: boolean) => (status ? valueIn : valueOut),
		[valueIn, valueOut],
	);
	const getDelay = useCallback(
		(status: boolean) => (status ? delayIn : delayOut) || delayProp,
		[delayIn, delayOut, delayProp],
	);

	const defaultValue = getValue(status);

	const [value, setValue] = useState(defaultValue);

	useEffect(() => {
		const nextValue = getValue(!status);
		const currentDelay = getDelay(status);

		delay(currentDelay).then(() => {
			setValue(nextValue);
		});
	}, [status, getValue, getDelay]);

	return value;
};
