import { goBack } from "@modules/core/router/shared/lib";
import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import { SignatureDetailSelectMemo as DataSection } from "@modules/signature/base/features/base/ui";
import { getSignatureSkins } from "@modules/signature/base/shared/lib";
import { getSignatureVariants } from "@modules/signature/base/shared/lib";
import type { SignatureDetailItem as Item } from "@modules/signature/base/shared/model";
import { addCurrentSignature } from "@modules/signature/signature-selection/entities/lib";
import {
	resetCurrentSignature,
	selectCurrentSignatureId,
	selectCurrentSkinId,
	selectReplaceSignature,
	setCurrentSignatureId,
	setCurrentSkinId,
} from "@modules/signature/signature-selection/shared/lib";
import {
	formatGameText,
	useAppDispatch,
	useAppSelector,
	whereId,
} from "@shared/lib";

import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { InvestigatorDescription } from "../content";
import * as C from "./SelectedSignatureDetails.components";

type DetailItem = Item | null;

const cardSize = 75;

export type SelectedSignatureDetailsProps = {
	group: InvestigatorSignatureGroup;
};

export const SelectedSignatureDetails = ({
	group,
}: SelectedSignatureDetailsProps) => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const skinId = useAppSelector(selectCurrentSkinId);
	const currentSignatureId = useAppSelector(selectCurrentSignatureId);
	const replaceInvestigator = useAppSelector(selectReplaceSignature);
	const artworksEnabled = useAppSelector(selectArtworksEnabled);

	const onChangeSkin = useCallback(
		(item: DetailItem) => {
			const id = skinId === item?.value ? null : item?.value;
			const value = id ?? null;
			dispatch(setCurrentSkinId(value));
		},
		[dispatch, skinId],
	);

	const onChangeSignature = useCallback(
		(item: DetailItem) => {
			const id = item?.value ?? null;
			const skinId = item?.imageId ?? null;
			dispatch(setCurrentSignatureId(id));
			dispatch(setCurrentSkinId(skinId));
		},
		[dispatch],
	);

	const select = useCallback(() => {
		dispatch(addCurrentSignature());
		dispatch(goBack());
	}, [dispatch]);

	const cancel = useCallback(() => {
		dispatch(resetCurrentSignature());
		dispatch(goBack());
	}, [dispatch]);

	const skins = getSignatureSkins(group);

	const selectedSkinId = skinId ?? skins[0]?.id;

	const signatures = getSignatureVariants(group);
	const signature = group.signatures.find(whereId);
	const signatureId = currentSignatureId || signatures[0].id;

	const { name, subname } = group;

	const formattedName = formatGameText(name);
	const formattedSubname = formatGameText(subname);

	const okText = replaceInvestigator ? t`Continue` : t`Okay`;

	return (
		<C.Container>
			<C.Outside onPress={cancel} />
			<C.Content>
				<C.Outside onPress={cancel} />
				<C.Card
					faction={group.faction_code}
					title={formattedName}
					subtitle={formattedSubname}
					resizeable={false}
					onClose={cancel}
					actions={[
						{
							id: "dismiss",
							title: t`Cancel`,
							icon: "dismiss",
							onPress: cancel,
						},
						{
							id: "ok",
							icon: "check",
							primary: true,
							title: okText,
							onPress: select,
						},
					]}
				>
					<C.Sections>
						{signature && <InvestigatorDescription signature={signature} />}
						{signatures.length > 1 && (
							<DataSection
								title={t`Versions`}
								data={signatures}
								selectedId={signatureId}
								onChange={onChangeSignature}
								size={cardSize}
								preview={artworksEnabled}
							/>
						)}
						{artworksEnabled && skins.length > 1 && (
							<DataSection
								title={t`Skins`}
								data={skins}
								onChange={onChangeSkin}
								selectedId={selectedSkinId}
								showIcon={false}
								size={cardSize}
								preview
							/>
						)}
					</C.Sections>
				</C.Card>
			</C.Content>
		</C.Container>
	);
};
