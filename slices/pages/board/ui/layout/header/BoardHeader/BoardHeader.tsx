import { useInvestigatorTranslation } from "@features/i18n";
import { LayoutContext } from "@pages/board/config";
import { useFaction } from "@pages/board/lib";
import {
	selectCurrentBoard,
	selectInvestigatorBoards,
	useAppSelector,
} from "@shared/lib";
import { InvestigatorHeader } from "@widgets/game/investigator-header";
import type { RenderInvestigatorSkillItem } from "@widgets/game/investigator-skills";
import { useCallback, useContext } from "react";
import type { ViewProps } from "react-native";
import * as C from "./BoardHeader.components";

export type BoardHeaderProps = ViewProps;

export const BoardHeader = (props: BoardHeaderProps) => {
	const { layout } = useContext(LayoutContext);
	const board = useAppSelector(selectCurrentBoard);
	const single = useAppSelector(
		(state) => selectInvestigatorBoards(state).length === 1,
	);
	const { investigator, isParallel, unique, id } = board;
	const { faction, canChangeFaction, nextFaction } = useFaction(board);

	const translate = useInvestigatorTranslation(investigator);

	const [name, language] = translate("name");
	const { subname = "" } = investigator;

	const renderSkill = useCallback((props: RenderInvestigatorSkillItem) => {
		return <C.Skill {...props} />;
	}, []);

	const titleProps = {
		entityId: id,
		parallel: isParallel,
		pressableTitle: canChangeFaction,
		onTitlePress: nextFaction,
		name,
		subname,
		faction,
		language,
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
