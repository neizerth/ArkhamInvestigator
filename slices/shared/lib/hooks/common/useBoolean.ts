import { useMemo, useState } from "react";

export const useBoolean = (defaultValue?: boolean) => {
	const [value, setValue] = useState(defaultValue);

	const controller = useMemo(
		() => ({
			put: setValue,
			on: () => setValue(true),
			off: () => setValue(false),
			toggle: () => setValue((prev) => !prev),
		}),
		[],
	);
	return [value, controller] as [boolean, typeof controller];
};
