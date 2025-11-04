import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import { createConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/lib";
import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import { color } from "@shared/config";
import type { ViewStyle } from "react-native";
import { actionIds } from "../../config";

type ItemInfo = {
	count: number;
	token?: ChaosBagToken;
};

type Item = {
	bless: ItemInfo;
	curse: ItemInfo;
};

type Source = {
	chaosBag: Item;
	history: Item;
};

const chaosTokenTypes = ["bless", "curse"] as const;
const sourceTypes = ["chaosBag", "history"] as const;

export const getActions = (source: Source) => {
	return sourceTypes.flatMap((sourceType) =>
		createGroupActions({ source, sourceType }),
	);
};

const backgroundMap: Record<string, string> = {
	history: color.dark10,
};

const createGroupActions = ({
	source,
	sourceType,
}: {
	source: Source;
	sourceType: (typeof sourceTypes)[number];
}) => {
	const group = source[sourceType];
	const ids = actionIds[sourceType];
	return chaosTokenTypes.reduce((acc, type) => {
		const { count, token } = group[type];
		const id = ids[type];
		if (count > 0 && token) {
			const backgroundColor = backgroundMap[sourceType];

			const style: ViewStyle = {
				...(backgroundColor ? { backgroundColor } : {}),
				justifyContent: "center",
			};

			acc.push(
				createConfirmModalAction({
					id,
					close: false,
					icon: "",
					title: {
						i18nKey: `ability.wendy.parallel.action.${sourceType}`,
						data: {
							token: `[${type}]`,
						},
					},
					data: {
						token,
						sourceType,
					},
					style,
				}),
			);
		}
		return acc;
	}, [] as ConfirmModalAction[]);
};
