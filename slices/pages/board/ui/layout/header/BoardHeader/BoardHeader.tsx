import { useInvestigatorTranslation } from "@features/i18n";
import {
	selectBoardsCount,
	selectCurrentBoardProp,
	selectCurrentFaction,
	toggleFactionSelect,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import { selectAvailableFactions } from "@shared/lib/store/features/board/selectors/current/faction/selectAvailableFactions";
import { InvestigatorHeaderMemo as InvestigatorHeader } from "@widgets/game/investigator-header";
import type { RenderInvestigatorSkillItem } from "@widgets/game/investigator-skills";
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
	const isParallel = useAppSelector(selectCurrentBoardProp("isParallel"));
	const unique = useAppSelector(selectCurrentBoardProp("unique"));
	const id = useAppSelector(selectCurrentBoardProp("id"));
	const faction = useAppSelector(selectCurrentFaction);
	const availableFactions = useAppSelector(selectAvailableFactions);

	const pressableTitle = availableFactions.length > 0;

	const translate = useInvestigatorTranslation(investigator);

	const onTitlePress = useCallback(() => {
		if (!pressableTitle) {
			return false;
		}
		dispatch(toggleFactionSelect());
	}, [dispatch, pressableTitle]);

	const [name, language] = translate("name");
	const { subname = "" } = investigator;

	const renderSkill = useCallback((props: RenderInvestigatorSkillItem) => {
		return <C.Skill {...props} />;
	}, []);

	const titleProps = {
		entityId: id,
		parallel: isParallel,
		pressableTitle,
		onTitlePress,
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
