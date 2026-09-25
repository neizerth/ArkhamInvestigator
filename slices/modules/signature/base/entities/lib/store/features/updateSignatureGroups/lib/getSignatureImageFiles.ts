import { getSignatureSkinId } from "@modules/signature/base/shared/lib";
import type { SignatureImageType } from "@modules/signature/base/shared/model";
import type { InvestigatorSignatureGroup as Group } from "arkham-investigator-data";
import { uniqBy } from "ramda";

export type SignatureImageFile = {
	code: string;
	type: SignatureImageType;
};

const getKey = ({ code, type }: SignatureImageFile) => `${type}/${code}`;

/**
 * Image files the groups need on disk. A signature without a full image
 * has only the square one: its full image is not on the server.
 */
export const getSignatureImageFiles = (groups: Group[]) => {
	const files = groups.flatMap(({ signatures, skins }) => {
		const signatureFiles = signatures.flatMap(
			({ image, has_full_image }): SignatureImageFile[] => [
				{ code: image.id, type: "square" },
				...(has_full_image !== false
					? [{ code: image.id, type: "full" as const }]
					: []),
			],
		);

		const skinFiles = (skins ?? []).flatMap((skin): SignatureImageFile[] => {
			const code = getSignatureSkinId(skin);

			return [
				{ code, type: "square" },
				{ code, type: "full" },
			];
		});

		return [...signatureFiles, ...skinFiles];
	});

	return uniqBy(getKey, files);
};
