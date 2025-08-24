import { selectBoardIsUnique } from "@modules/board/base/entities/base/lib";
import {
	selectBoardProp,
	selectNonUniqueId,
} from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import { selectBoardIsInactive } from "@modules/mechanics/board/base/entities/lib";
import { useAppSelector } from "@shared/lib";
import * as C from "./InvestigatorSelectItem.components";

export type InvestigatorSelectItemProps = TouchableOpacityProps & {
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

	const id = useAppSelector(selectNonUniqueId(boardId));

	const faction = investigator.faction_code;
	const showId = !unique;

	return (
		<C.Container {...props} faction={faction}>
			<C.Image code={image.id} type="square" grayscale={inactive} animated />
			{showId && (
				<C.Overlay>
					<C.Id value={id} />
				</C.Overlay>
			)}
		</C.Container>
	);
};
