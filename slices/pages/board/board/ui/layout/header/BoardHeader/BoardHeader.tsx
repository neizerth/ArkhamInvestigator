import {
	selectCurrentIsParallel,
	selectCurrentIsUnique,
} from "@modules/board/base/entities/base/lib";
import { useLeaveBoard } from "@modules/board/base/features/leave-board";
import {
	selectBoardsCount,
	selectCurrentBoardProp,
	selectNonUniqueId,
	setNextBoardIndex,
	setPrevBoardIndex,
} from "@modules/board/base/shared/lib";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { openModal } from "@modules/core/modal/shared/base/lib";
import {
	selectCanChangeFaction,
	selectCurrentFaction,
} from "@modules/mechanics/board/base/entities/lib";
import { routes } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/lib";
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
	const goToPage = useLeaveBoard();
	const single = boardsCount === 1;

	const investigator = useAppSelector(selectCurrentBoardProp("investigator"));
	const isParallel = useAppSelector(selectCurrentIsParallel);
	const unique = useAppSelector(selectCurrentIsUnique);
	const boardId = useAppSelector(selectNonUniqueId("current"));
	const faction = useAppSelector(selectCurrentFaction);
	const pressableTitle = useAppSelector(selectCanChangeFaction("current"));

	const next = useCallback(() => {
		dispatch(setNextBoardIndex());
	}, [dispatch]);

	const prev = useCallback(() => {
		dispatch(setPrevBoardIndex());
	}, [dispatch]);

	const onPress = useCallback(() => {
		if (!pressableTitle) {
			return false;
		}
		dispatch(
			openModal({
				id: CustomModalId.factionSelect,
			}),
		);
	}, [dispatch, pressableTitle]);

	const onTitlePress = useCallback(() => {
		if (single) {
			return false;
		}
		goToPage(routes.overview)();
	}, [goToPage, single]);

	const renderSkill = useCallback((props: RenderInvestigatorSkillItem) => {
		return <C.Skill {...props} />;
	}, []);

	if (!investigator || !faction || typeof boardId !== "number") {
		return null;
	}

	const { subname, name, locale } = investigator;

	const titleProps = {
		entityId: boardId,
		parallel: isParallel,
		onNextPress: next,
		onPrevPress: prev,
		pressableTitle: !single,
		onTitlePress,
		onPress,
		name,
		subname,
		faction,
		language: locale,
		single,
		unique,
		showArrows: !single,
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
