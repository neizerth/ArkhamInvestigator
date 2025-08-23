import { selectDescriptionTextSize } from "@modules/board/base/entities/description/lib";
import { InvestigatorText } from "@modules/board/base/entities/typography/ui";
import { selectBoardProp } from "@modules/board/base/shared/lib";
import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import { selectBoardFaction } from "@modules/mechanics/board/base/entities/lib";
import { useAppSelector } from "@shared/lib";
import * as C from "./BoardDescriptionLoader.components";
import { useDescriptionLayout } from "./useDescriptionLayout";

export type BoardDescriptionLoaderProps = PropsWithBoardId & {
	unit: number;
};

export const BoardDescriptionLoader = (props: BoardDescriptionLoaderProps) => {
	const { boardId } = props;
	const investigator = useAppSelector(
		selectBoardProp({
			boardId,
			prop: "investigator",
		}),
	);

	const faction = useAppSelector(selectBoardFaction(boardId));

	const unit = useAppSelector(
		selectDescriptionTextSize({
			boardId,
			unit: props.unit,
		}),
	);

	const onLayout = useDescriptionLayout(boardId);

	return (
		<C.Container faction={faction}>
			<C.Content onLayout={onLayout}>
				<InvestigatorText investigator={investigator} unit={unit} />
			</C.Content>
		</C.Container>
	);
};
