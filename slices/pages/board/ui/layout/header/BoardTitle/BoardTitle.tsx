import { useInvestigatorTranslation } from "@features/i18n";
import { LayoutContext } from "@pages/board/config";
import { getTitleSize, useFaction } from "@pages/board/lib";
import { selectInvestigatorBoards, useAppSelector } from "@shared/lib";
import type { InvestigatorBoard } from "@shared/model";
import { InvestigatorTitle } from "@widgets/game/investigator-title";
import { memo, useContext } from "react";
import type { ImageBackgroundProps, ViewStyle } from "react-native";

export type BoardTitleProps = Omit<ImageBackgroundProps, "source"> & {
	contentContainerStyle?: ViewStyle;
	board: InvestigatorBoard;
};

export const BoardTitle = ({ board, ...props }: BoardTitleProps) => {
	const { layout } = useContext(LayoutContext);
	const single = useAppSelector(
		(state) => selectInvestigatorBoards(state).length === 1,
	);
	const { investigator, isParallel, unique, id } = board;
	const { faction, canChangeFaction, nextFaction } = useFaction(board);

	const translate = useInvestigatorTranslation(investigator);

	const [name, language] = translate("name");
	const { subname = "" } = investigator;

	const box = getTitleSize(layout);

	return (
		<InvestigatorTitle
			{...props}
			{...box}
			single={single}
			entityId={id}
			unique={unique}
			parallel={isParallel}
			faction={faction}
			name={name}
			subname={subname}
			language={language}
			pressable={canChangeFaction}
			onPress={nextFaction}
		/>
	);
};

export const InvestigatorTitleMemo = memo(BoardTitle);
