import { selectShowInitialHealthAndSanity } from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import { type WithPickerValueProps, withPickerValue } from "../../lib";
import * as C from "./SanityValue.components";

export type SanityValueProps = WithPickerValueProps & {
	initialValue?: number;
};

const Control = withPickerValue({
	Background: C.Container,
	Value: C.Value,
});

export const SanityValue = ({
	value,
	initialValue,
	...props
}: SanityValueProps) => {
	const showInitial = useAppSelector(selectShowInitialHealthAndSanity);

	return (
		<Control {...props} value={value}>
			{showInitial && typeof initialValue === "number" && (
				<C.Initial>
					<C.InitialValue value={initialValue} />
				</C.Initial>
			)}
		</Control>
	);
};
