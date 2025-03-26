import { Select, type SelectItem, type SelectProps } from "@shared/ui";
import { useCallback } from "react";
import { useHapticFeedback } from "../../../haptic/lib/hooks/useHapticFeedback";

export type HapticSelectProps<T> = SelectProps<T>;

export function HapticSelect<T>({
	onChange,
	onFocus,
	onBlur,
	...props
}: HapticSelectProps<T>) {
	const feedback = useHapticFeedback("selection");
	const onChangeProp = useCallback(
		(item: SelectItem<T>) => {
			feedback();
			onChange(item);
		},
		[onChange, feedback],
	);

	const onFocusProp = useCallback(() => {
		feedback();
		onFocus?.();
	}, [feedback, onFocus]);

	const onBlurProp = useCallback(() => {
		feedback();
		onBlur?.();
	}, [feedback, onBlur]);

	return (
		<Select
			{...props}
			onBlur={onBlurProp}
			onFocus={onFocusProp}
			onChange={onChangeProp}
		/>
	);
}
