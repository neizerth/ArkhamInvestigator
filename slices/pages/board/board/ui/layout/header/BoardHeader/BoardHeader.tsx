import {
	selectCurrentIsParallel,
	selectCurrentIsUnique,
} from "@modules/board/base/entities/lib";
import {
	selectBoardsCount,
	selectCurrentBoardProp,
} from "@modules/board/base/shared/lib";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { openCustomModal } from "@modules/core/modal/shared/base/lib";
import {
	selectCanChangeFaction,
	selectCurrentFaction,
} from "@modules/mechanics/board/base/entities/lib";
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
	const single = boardsCount === 1;

	const investigator = useAppSelector(selectCurrentBoardProp("investigator"));
	const isParallel = useAppSelector(selectCurrentIsParallel);
	const unique = useAppSelector(selectCurrentIsUnique);
	const boardId = useAppSelector(selectCurrentBoardProp("id"));
	const faction = useAppSelector(selectCurrentFaction);
	const pressableTitle = useAppSelector(selectCanChangeFaction("current"));

	const onTitlePress = useCallback(() => {
		if (!pressableTitle) {
			return false;
		}
		dispatch(
			openCustomModal({
				id: CustomModalId.factionSelect,
			}),
		);
	}, [dispatch, pressableTitle]);

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
