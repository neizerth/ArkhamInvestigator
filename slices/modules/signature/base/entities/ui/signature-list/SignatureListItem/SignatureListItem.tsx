import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import type { InvestigatorSignature } from "arkham-investigator-data";
import * as C from "./SignatureListItem.components";

export type SignatureListItemProps = TouchableOpacityProps & {
	signature: InvestigatorSignature;
	selected: boolean;
	disabled: boolean;
	selectedCount: number;
};

export const SignatureListItem = ({
	signature,
	selected,
	disabled,
	selectedCount,
	...props
}: SignatureListItemProps) => {
	const faction = signature.faction_code;
	return (
		<C.Container {...props}>
			<C.FactionIcon faction={signature.faction_code} />
			<C.Main>
				<C.Header>
					<C.Title faction={faction}>{signature.name}</C.Title>
					<C.PackIcon icon={signature.pack.icon} />
				</C.Header>
				<C.Subtitle>{signature.subname}</C.Subtitle>
			</C.Main>
		</C.Container>
	);
};
