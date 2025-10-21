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
			<C.Content>
				<C.FactionIcon faction={signature.faction_code} />

				<C.Main>
					<C.Header>
						<C.Title faction={faction}>{signature.name}</C.Title>
						<C.PackIcon icon={signature.pack.icon} />
					</C.Header>
					<C.Subtitle>{signature.subname}</C.Subtitle>
				</C.Main>
				{selected && (
					<C.Selection>
						{selectedCount > 1 ? (
							<C.MultipleSelection>
								<C.SelectedCount value={selectedCount} />
							</C.MultipleSelection>
						) : (
							<C.Check faction={faction} icon="checklist" />
						)}
					</C.Selection>
				)}
			</C.Content>
		</C.Container>
	);
};
