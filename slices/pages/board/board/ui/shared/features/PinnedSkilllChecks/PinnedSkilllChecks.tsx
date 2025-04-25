import { selectCurrentLanguage } from "@features/i18n";
import {
	selectCurrentBoardProp,
	selectPinnedSkillChecks,
	setCurrentBoardProp,
	toggleSkillCheckHistoryItemPin as togglePin,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { memo, useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./PinnedSkilllChecks.components";
import { getExpressionDisplayStyle } from "./PinnedSkilllChecks.styles";
import { useContainerAnimation, useContentAnimation } from "./animation";

export type PinnedSkilllChecksProps = ViewProps;

export const PinnedSkilllChecks = (props: PinnedSkilllChecksProps) => {
	const dispatch = useAppDispatch();
	const language = useAppSelector(selectCurrentLanguage);
	const items = useAppSelector(selectPinnedSkillChecks);
	const defaultShow = useAppSelector(
		selectCurrentBoardProp("showPinnedSkillChecks"),
	);
	const show = defaultShow ?? true;
	const removeItem = useCallback(
		(id: string) => () => {
			dispatch(togglePin(id));
		},
		[dispatch],
	);

	const toggleShow = useCallback(() => {
		dispatch(setCurrentBoardProp("showPinnedSkillChecks", !show));
	}, [dispatch, show]);

	const toggleAnimation = useContainerAnimation(show);
	const fadeContentAnimation = useContentAnimation(show);

	const displayStyle = getExpressionDisplayStyle(language);

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
								<C.Item key={item.id} onLongPress={removeItem(item.id)}>
									<C.ItemContent>
										{item.title && <C.Title>{item.title}:</C.Title>}
										<C.Expression
											{...displayStyle}
											data={item.expression}
											value={item.value}
											showDiff={false}
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
