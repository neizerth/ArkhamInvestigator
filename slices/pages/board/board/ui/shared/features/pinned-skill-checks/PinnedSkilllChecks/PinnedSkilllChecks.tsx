import {
	selectCurrentBoardProp,
	selectTapToHidePins,
	setBoardProp,
} from "@modules/board/base/shared/lib";
import { selectPinnedSkillChecks } from "@modules/board/skill-check/shared/lib";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { always } from "ramda";
import { memo, useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./PinnedSkilllChecks.components";

export type PinnedSkilllChecksProps = ViewProps;

export const PinnedSkilllChecks = (props: PinnedSkilllChecksProps) => {
	const dispatch = useAppDispatch();
	const items = useAppSelector(selectPinnedSkillChecks("current"));
	const tapToHide = useAppSelector(selectTapToHidePins);
	const defaultShow = useAppSelector(
		selectCurrentBoardProp("showPinnedSkillChecks"),
	);

	const show = defaultShow ?? true;

	const toggleShow = useCallback(() => {
		dispatch(
			setBoardProp({
				boardId: "current",
				prop: "showPinnedSkillChecks",
				value: !show,
			}),
		);
	}, [dispatch, show]);

	if (items.length === 0) {
		return null;
	}

	const onAreaPress = tapToHide ? toggleShow : always(false as const);

	const showToggle = (tapToHide && !show) || !tapToHide;

	return (
		<C.Container {...props}>
			{show ? (
				<C.Area activeOpacity={tapToHide ? 0.2 : 1} onPress={onAreaPress}>
					<C.Content>
						{show && (
							<C.List>
								{items.map((item, index, { length }) => (
									<C.Item
										key={item.id}
										item={item}
										isLast={index === length - 1}
									/>
								))}
							</C.List>
						)}
					</C.Content>

					{showToggle && (
						<C.Toggle onPress={toggleShow}>
							<C.ToggleIcon />
						</C.Toggle>
					)}
					<C.Background />
				</C.Area>
			) : (
				<C.ShowContainer>
					<C.ShowButton onPress={toggleShow}>
						<C.ShowIcon />
					</C.ShowButton>
				</C.ShowContainer>
			)}
		</C.Container>
	);
};

export const PinnedSkilllChecksMemo = memo(PinnedSkilllChecks);
