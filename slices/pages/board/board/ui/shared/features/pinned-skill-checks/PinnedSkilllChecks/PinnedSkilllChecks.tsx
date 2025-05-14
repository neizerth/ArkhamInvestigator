import {
	selectCurrentBoardProp,
	selectPinnedSkillChecks,
	selectTapToHidePins,
	setBoardProp,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { always } from "ramda";
import { memo, useCallback } from "react";
import { type ViewProps, useWindowDimensions } from "react-native";
import * as C from "./PinnedSkilllChecks.components";

export type PinnedSkilllChecksProps = ViewProps;

export const PinnedSkilllChecks = (props: PinnedSkilllChecksProps) => {
	const dispatch = useAppDispatch();
	const items = useAppSelector(selectPinnedSkillChecks);
	const tapToHide = useAppSelector(selectTapToHidePins);
	const defaultShow = useAppSelector(
		selectCurrentBoardProp("showPinnedSkillChecks"),
	);

	const show = defaultShow ?? true;

	const toggleShow = useCallback(() => {
		dispatch(setBoardProp("showPinnedSkillChecks", !show));
	}, [dispatch, show]);

	const { width } = useWindowDimensions();

	if (items.length === 0) {
		return null;
	}

	const areaStyle = {
		right: show ? 0 : -width + 80,
	};

	const onAreaPress = tapToHide ? toggleShow : always(false);

	const showToggle = (tapToHide && !show) || !tapToHide;

	return (
		<C.Container {...props}>
			<C.Area
				style={areaStyle}
				activeOpacity={tapToHide ? 0.2 : 1}
				onPress={onAreaPress}
			>
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
					<C.Toggle onPress={toggleShow} show={show}>
						<C.ToggleIcon show={show} />
					</C.Toggle>
				)}
				<C.Background />
			</C.Area>
		</C.Container>
	);
};

export const PinnedSkilllChecksMemo = memo(PinnedSkilllChecks);
