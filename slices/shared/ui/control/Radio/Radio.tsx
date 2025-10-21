import { Checkbox, type CheckboxProps } from "../Checkbox";

export type RadioProps = Omit<CheckboxProps, "checkedIcon" | "uncheckedIcon">;

export const Radio = (props: RadioProps) => {
	return (
		<Checkbox
			{...props}
			checkedIcon="radio-checked"
			uncheckedIcon="radio-unchecked"
		/>
	);
};
