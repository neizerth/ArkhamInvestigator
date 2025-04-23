import {
	selectCurrentBoardProp,
	selectPinnedSkillChecks,
	setCurrentBoardProp,
	toggleSkillCheckHistoryItemPin as togglePin,
	useAppDispatch,
	useAppSelector,
	useBooleanAnimation,
	useFadeAnimation,
} from "@shared/lib";
import { memo, useCallback } from "react";
import { type ViewProps, useWindowDimensions } from "react-native";
import * as C from "./PinnedSkilllChecks.components";

export type PinnedSkilllChecksProps = ViewProps;

export const PinnedSkilllChecks = (props: PinnedSkilllChecksProps) => {
	const dispatch = useAppDispatch();
	const items = useAppSelector(selectPinnedSkillChecks);
	const defaultShow = useAppSelector(
		selectCurrentBoardProp("showPinnedSkillChecks"),
	);
	const show = defaultShow ?? true;
	const { width } = useWindowDimensions();

	const removeItem = useCallback(
		(id: string) => () => {
			dispatch(togglePin(id));
		},
		[dispatch],
	);

	const toggleShow = useCallback(() => {
		dispatch(setCurrentBoardProp("showPinnedSkillChecks", !show));
	}, [dispatch, show]);

	const toggleAnimation = useBooleanAnimation({
		enabled: show,
		delayIn: 200,
		duration: 200,
		maxValue: 0,
		minValue: -width + 100,
		styleResolver(left) {
			"worklet";
			return {
				left,
			};
		},
	});

	const fadeContentAnimation = useFadeAnimation({
		show,
		delayOut: 200,
		duration: 200,
	});

	if (items.length === 0) {
		return null;
	}

	return (
		<C.Container {...props}>
			<C.Area style={toggleAnimation}>
				<C.Pressable onPress={toggleShow}>
					<C.Content style={fadeContentAnimation}>
						<C.List>
							{items.map((item, index, { length }) => (
								<C.Item key={item.id}>
									<C.ItemContent>
										{item.title && <C.Title>{item.title}:</C.Title>}
										<C.Expression
											data={item.expression}
											value={item.value}
											showDiff={false}
											onLongPress={removeItem(item.id)}
										/>
									</C.ItemContent>
									{index !== length - 1 && <C.Text>,</C.Text>}
								</C.Item>
							))}
						</C.List>
					</C.Content>

					<C.Background />
				</C.Pressable>
			</C.Area>
		</C.Container>
	);
};

export const PinnedSkilllChecksMemo = memo(PinnedSkilllChecks);
