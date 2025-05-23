import {
	selectBoardProp,
	selectShowInitialHealthAndSanity,
	useAppSelector,
} from "@shared/lib";
import type { BoardId } from "@shared/model";
import { type WithPickerValueProps, withPickerValue } from "../../lib";
import * as C from "./SanityValue.components";

export type SanityValueProps = WithPickerValueProps & {
	boardId?: BoardId;
};

const Control = withPickerValue({
	Background: C.Container,
	Value: C.Value,
});

export const SanityValue = ({
	value,
	boardId = "current",
	...props
}: SanityValueProps) => {
	const showInitial = useAppSelector(selectShowInitialHealthAndSanity);
	const initialValue = useAppSelector(selectBoardProp(boardId, "initialValue"));

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
