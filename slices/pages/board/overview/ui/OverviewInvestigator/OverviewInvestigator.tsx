import { selectBoardById } from "@modules/board/base/shared/lib";
import {
	selectBoardFaction,
	selectBoardIsInactive,
} from "@modules/mechanics/board/base/entities/lib";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./OverviewInvestigator.components";
import { useOverviewStats } from "./useOverviewStats";

export type OverviewInvestigatorProps = ViewProps & {
	boardId: number;
	selected?: boolean;
	onSelect?: () => void;
};

/** one investigator row of the overview: the stats and the signature image */
export const OverviewInvestigator = ({
	boardId,
	selected = false,
	onSelect,
	...props
}: OverviewInvestigatorProps) => {
	const { investigator, image } = useAppSelector(selectBoardById(boardId));

	const faction = useAppSelector(selectBoardFaction(boardId));
	const inactive = useAppSelector(selectBoardIsInactive(boardId));

	const stats = useOverviewStats(boardId);

	return (
		<C.Container {...props}>
			<C.Content>
				<C.Primary>
					<C.Name>{investigator.name}</C.Name>
					<C.Skills {...stats.skills} />
					<C.Stats>
						<C.Health {...stats.health} />
						<C.Sanity {...stats.sanity} />
						<C.Clues {...stats.clues} />
						<C.Resources {...stats.resources} />
						<C.Actions {...stats.actions} />
					</C.Stats>
				</C.Primary>
				<C.Secondary>
					<C.Image
						size={110}
						faction={faction}
						code={investigator.code}
						imageId={image.id}
						onPress={onSelect}
						selected={selected}
						grayscale={inactive}
					/>
				</C.Secondary>
			</C.Content>
		</C.Container>
	);
};
