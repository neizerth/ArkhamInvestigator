import {
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,
	setCurrentInvestigatorIndex,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import type {
	PickerChangeEvent,
	PickerItemInfo,
} from "@widgets/control/picker";
import { prop } from "ramda";
import { useCallback, useMemo, useState } from "react";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorSelect.components";

export type InvestigatorSelectProps = ViewProps;

export const InvestigatorSelect = ({ ...props }: InvestigatorSelectProps) => {
	const index = useAppSelector(selectCurrentInvestigatorIndex);
	const boards = useAppSelector(selectInvestigatorBoards);
	const dispatch = useAppDispatch();

	const currentIndex = index || 0;
	const nextIndex = (currentIndex + 1) % boards.length;
	const prevIndex = currentIndex === 0 ? boards.length - 1 : currentIndex - 1;
	const [scrollIndex, setScrollIndex] = useState(currentIndex);

	const renderItem = useCallback((props: PickerItemInfo) => {
		const { item } = props;

		return <C.Value boardId={item} />;
	}, []);

	const onChange = useCallback(
		({ value }: PickerChangeEvent) => {
			if (!value) {
				return;
			}
			const index = value - 1;
			dispatch(setCurrentInvestigatorIndex(index));
		},
		[dispatch],
	);

	const next = useCallback(() => {
		dispatch(setCurrentInvestigatorIndex(nextIndex));
	}, [dispatch, nextIndex]);

	const prev = useCallback(() => {
		dispatch(setCurrentInvestigatorIndex(prevIndex));
	}, [dispatch, prevIndex]);

	const onValueChanging = (item: PickerChangeEvent) => {
		setScrollIndex(item.index);
	};

	const data = useMemo(() => boards.map(prop("id")), [boards]);

	const value = data[currentIndex];

	const showDown = scrollIndex !== 0;
	const showUp = scrollIndex !== boards.length - 1;

	return (
		<C.Container {...props}>
			{showUp && (
				<C.Up onPress={next}>
					<C.UpIcon />
				</C.Up>
			)}
			<C.Picker
				data={data}
				value={value}
				renderItem={renderItem}
				onValueChanged={onChange}
				onValueChanging={onValueChanging}
				onPress={next}
			/>
			{showDown && (
				<C.Down onPress={prev}>
					<C.DownIcon />
				</C.Down>
			)}
		</C.Container>
	);
};
