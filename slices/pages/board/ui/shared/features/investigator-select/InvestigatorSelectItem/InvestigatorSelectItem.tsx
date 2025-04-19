import {
	selectBoardIsUnique,
	selectBoardProp,
	selectIsInactive,
	useAppSelector,
} from "@shared/lib";
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
	const inactive = useAppSelector(selectIsInactive(boardId));

	if (!image || !investigator) {
		return null;
	}

	const faction = investigator.faction_code as Faction;
	const showId = !unique;

	return (
		<C.Container {...props} faction={faction}>
			<C.Image code={image.id} active={!inactive} />
			{showId && (
				<C.Overlay>
					<C.Id value={boardId} />
				</C.Overlay>
			)}
		</C.Container>
	);
};
