import { useLeaveBoard } from "@modules/board/base/features/leave-board";
import {
	selectCurrentInvestigatorIndex,
	selectInvestigatorBoards,
	setCurrentInvestigatorIndex,
} from "@modules/board/base/shared/lib";
import type {
	PickerChangeEvent,
	PickerItemInfo,
} from "@modules/core/control/entities/picker/model";
import { routes } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { prop } from "ramda";
import { useCallback, useMemo, useState } from "react";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorSelect.components";

export type InvestigatorSelectProps = ViewProps;

export const InvestigatorSelect = ({ ...props }: InvestigatorSelectProps) => {
	const index = useAppSelector(selectCurrentInvestigatorIndex);
	const boards = useAppSelector(selectInvestigatorBoards);
	const dispatch = useAppDispatch();
	const goToPage = useLeaveBoard();

	const currentIndex = index || 0;
	const nextIndex = (currentIndex + 1) % boards.length;
	const prevIndex = currentIndex === 0 ? boards.length - 1 : currentIndex - 1;
	const [scrollIndex, setScrollIndex] = useState(currentIndex);

	const renderItem = useCallback((props: PickerItemInfo<number>) => {
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
		setScrollIndex(nextIndex);
	}, [dispatch, nextIndex]);

	const prev = useCallback(() => {
		dispatch(setCurrentInvestigatorIndex(prevIndex));
		setScrollIndex(prevIndex);
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
					<C.IconContainer>
						<C.UpIcon />
					</C.IconContainer>
				</C.Up>
			)}
			<C.Picker
				data={data}
				value={value}
				renderItem={renderItem}
				onValueChanged={onChange}
				onValueChanging={onValueChanging}
				onPress={next}
				onLongPress={goToPage(routes.overview)}
				decelerationRate={0}
				disableIntervalMomentum
			/>
			{showDown && (
				<C.Down onPress={prev}>
					<C.IconContainer>
						<C.DownIcon />
					</C.IconContainer>
				</C.Down>
			)}
		</C.Container>
	);
};
