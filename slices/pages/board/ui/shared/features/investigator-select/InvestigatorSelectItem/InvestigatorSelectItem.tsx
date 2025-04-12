import { getInvestigatorImageUrl } from "@shared/api";
import {
	selectBoardProp,
	selectIsDefeated,
	selectTurnEnd,
	useAppSelector,
} from "@shared/lib";
import { selectBoardIsUnique } from "@shared/lib/store/features/board/selectors/props/selectBoardIsUnique";
import type { Faction } from "@shared/model";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorSelectItem.components";

export type InvestigatorSelectItemProps = ViewProps & {
	boardId: number;
};

export const InvestigatorSelectItem = ({
	boardId,
	...props
}: InvestigatorSelectItemProps) => {
	const image = useAppSelector(selectBoardProp(boardId, "image"));
	const investigator = useAppSelector(selectBoardProp(boardId, "investigator"));
	const unique = useAppSelector(selectBoardIsUnique(boardId));
	const isTurnEnd = useAppSelector(selectTurnEnd(boardId));
	const isDefeated = useAppSelector(selectIsDefeated(boardId));

	const active = !(isTurnEnd || isDefeated);

	if (!image || !investigator) {
		return null;
	}

	const uri = getInvestigatorImageUrl({
		code: image.id,
		type: "square",
	});
	const faction = investigator.faction_code as Faction;
	const showId = !unique;

	const source = { uri };

	return (
		<C.Container {...props} faction={faction}>
			<C.Image source={source} active={active} />
			{showId && (
				<C.Overlay>
					<C.Id value={boardId} />
				</C.Overlay>
			)}
		</C.Container>
	);
};
