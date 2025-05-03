import {
	selectBoardsCount,
	selectCurrentBoardProp,
	selectCurrentFaction,
	selectIsParallel,
	toggleFactionSelect,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { selectAvailableFactions } from "@shared/lib/store/features/board/selectors/current/faction/selectAvailableFactions";
import { selectIsUnique } from "@shared/lib/store/features/board/selectors/current/signature/selectIsUnique";
import { InvestigatorHeaderMemo as InvestigatorHeader } from "@widgets/game/investigator";
import type { RenderInvestigatorSkillItem } from "@widgets/game/investigator";
import { useCallback, useContext } from "react";
import type { ViewProps } from "react-native";
import { LayoutContext } from "../../../../config";
import * as C from "./BoardHeader.components";

export type BoardHeaderProps = ViewProps;

export const BoardHeader = (props: BoardHeaderProps) => {
	const dispatch = useAppDispatch();
	const { layout } = useContext(LayoutContext);
	const boardsCount = useAppSelector(selectBoardsCount);
	const single = boardsCount === 1;

	const investigator = useAppSelector(selectCurrentBoardProp("investigator"));
	const isParallel = useAppSelector(selectIsParallel);
	const unique = useAppSelector(selectIsUnique);
	const id = useAppSelector(selectCurrentBoardProp("id"));
	const faction = useAppSelector(selectCurrentFaction);
	const availableFactions = useAppSelector(selectAvailableFactions);

	const pressableTitle = availableFactions.length > 0;

	const onTitlePress = useCallback(() => {
		if (!pressableTitle) {
			return false;
		}
		dispatch(toggleFactionSelect());
	}, [dispatch, pressableTitle]);

	const renderSkill = useCallback((props: RenderInvestigatorSkillItem) => {
		return <C.Skill {...props} />;
	}, []);

	if (!investigator) {
		return null;
	}

	const { subname, name, locale } = investigator;

	const titleProps = {
		entityId: id,
		parallel: isParallel,
		pressableTitle,
		onTitlePress,
		name,
		subname,
		faction,
		language: locale,
		single,
		unique,
	};

	const skillProps = {
		renderSkill,
	};

	const layoutProps = {
		direction: layout.type,
		gap: layout.gap,
		scale: layout.scale,
		width: layout.width,
	};

	return (
		<InvestigatorHeader
			{...props}
			{...layoutProps}
			{...titleProps}
			{...skillProps}
		/>
	);
};
