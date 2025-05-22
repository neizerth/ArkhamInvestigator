import {
	selectCurrentBoardProp,
	selectShowInitialHealthAndSanity,
	useAppSelector,
} from "@shared/lib";
import { type WithPickerValueProps, withPickerValue } from "../../lib";
import * as C from "./SanityValue.components";

export type SanityValueProps = WithPickerValueProps;

const Control = withPickerValue({
	Background: C.Container,
	Value: C.Value,
});

export const SanityValue = ({ value, ...props }: SanityValueProps) => {
	const showInitial = useAppSelector(selectShowInitialHealthAndSanity);
	const initialValue = useAppSelector(selectCurrentBoardProp("initialValue"));

	return (
		<Control {...props} value={value}>
			{showInitial && initialValue && (
				<C.Initial>
					<C.InitialValue value={initialValue?.sanity} />
				</C.Initial>
			)}
		</Control>
	);
};
