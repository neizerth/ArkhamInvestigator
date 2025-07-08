import { selectHasAdditionalAction } from "@modules/board/abilities/shared/lib";
import { selectBoardIsUnique } from "@modules/board/base/entities/lib";
import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { selectBoardIsInactive } from "@modules/mechanics/board/base/entities/lib";
import { useAppSelector } from "@shared/lib";
import type { Faction } from "@shared/model";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorSelectItem.components";

export type InvestigatorSelectItemProps = ViewProps & {
	boardId: BoardId;
};

export const InvestigatorSelectItem = ({
	boardId,
	...props
}: InvestigatorSelectItemProps) => {
	const image = useAppSelector(
		selectBoardProp({
			boardId,
			prop: "image",
		}),
	);
	const investigator = useAppSelector(
		selectBoardProp({
			boardId,
			prop: "investigator",
		}),
	);
	const unique = useAppSelector(selectBoardIsUnique(boardId));
	const inactive = useAppSelector(selectBoardIsInactive(boardId));

	// const end = useAppSelector(selectTurnEnd(boardId));
	const end = useAppSelector(selectHasAdditionalAction(boardId));

	if (!image || !investigator) {
		return null;
	}

	const faction = investigator.faction_code as Faction;
	const showId = !unique;

	return (
		<C.Container {...props} faction={faction}>
			<C.Image code={image.id} version={image.version} active={!inactive} />
			{showId && (
				<C.Overlay>
					<C.Id value={boardId} />
				</C.Overlay>
			)}
		</C.Container>
	);
};
