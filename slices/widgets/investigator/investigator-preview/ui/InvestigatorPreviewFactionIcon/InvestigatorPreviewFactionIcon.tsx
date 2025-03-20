import type { Faction } from "@shared/model";
import type { PropsWithFaction } from "@shared/model/ui";
import {
	Container,
	FactionImage,
	NeutralIcon,
} from "./InvestigatorPreviewFactionIcon.components";

export const InvestigatorPreviewFactionIcon = ({
	faction,
}: PropsWithFaction) => {
	return (
		<Container>
			{faction === "neutral" ? (
				<NeutralIcon />
			) : (
				<FactionImage faction={faction} />
			)}
		</Container>
	);
};
