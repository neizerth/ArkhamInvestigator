import { getInvestigatorImageUrl } from "@shared/api";
import { selectBoardById, useAppSelector } from "@shared/lib";
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
	const board = useAppSelector(selectBoardById(boardId));

	if (!board) {
		return null;
	}

	const { picture, investigator, unique, value } = board;
	const uri = getInvestigatorImageUrl({
		code: picture.id,
		type: "square",
	});
	const faction = investigator.faction_code as Faction;
	const showId = !unique;

	const source = { uri };

	const active = value.actions > 0 || value.additionalAction;

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
