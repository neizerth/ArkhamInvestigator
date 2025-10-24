import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import { space2Nbsp } from "@shared/lib/util/string";
import type { InvestigatorSignature } from "arkham-investigator-data";
import * as C from "./SignatureListItem.components";

export type SignatureListItemProps = TouchableOpacityProps & {
	signature: InvestigatorSignature;
	selected: boolean;
	disabled: boolean;
	selectedCount: number;
	showIcons: boolean;
};

export const SignatureListItem = ({
	signature,
	selected,
	disabled,
	selectedCount,
	showIcons = false,
	...props
}: SignatureListItemProps) => {
	const faction = signature.faction_code;
	const title = space2Nbsp(signature.name);
	return (
		<C.Container {...props}>
			<C.Content>
				{showIcons && <C.FactionIcon faction={signature.faction_code} />}
				<C.Main>
					<C.Header>
						<C.Title faction={faction}>{title}</C.Title>
						{showIcons && <C.PackIcon icon={signature.pack.icon} />}
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
