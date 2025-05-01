import { setShowRevealChaosTokenModal } from "@features/chaos-bag";
import { selectCurrentLanguage } from "@features/i18n";
import { useSkillItemChaosTokenRevealModal } from "@features/skill-check";
import {
	selectCurrentBoardProp,
	selectPinnedSkillChecks,
	setCurrentBoardProp,
	toggleSkillCheckHistoryItemPin as togglePin,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { memo, useCallback } from "react";
import { type ViewProps, useWindowDimensions } from "react-native";
import * as C from "./PinnedSkilllChecks.components";
import { getExpressionDisplayStyle } from "./PinnedSkilllChecks.styles";

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

	const setupReveal = useSkillItemChaosTokenRevealModal();

	const closeReveal = useCallback(() => {
		dispatch(setShowRevealChaosTokenModal(false));
	}, [dispatch]);

	const displayStyle = getExpressionDisplayStyle(language);

	const { width } = useWindowDimensions();

	if (items.length === 0) {
		return null;
	}

	const areaStyle = {
		left: show ? 0 : -width + 80,
	};

	return (
		<C.Container {...props}>
			<C.Area style={areaStyle}>
				<C.Content>
					{show && (
						<C.List>
							{items.map((item, index, { length }) => (
								<C.Item
									key={item.id}
									onPress={removeItem(item.id)}
									onPressIn={setupReveal(item)}
									onPressOut={closeReveal}
								>
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
					)}
				</C.Content>

				<C.Toggle onPress={toggleShow}>
					<C.ToggleIcon show={show} />
				</C.Toggle>
				<C.Background />
			</C.Area>
		</C.Container>
	);
};

export const PinnedSkilllChecksMemo = memo(PinnedSkilllChecks);
