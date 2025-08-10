import type { ArkhamIcon } from "@shared/model";

export const getIconMapping = (icons: ArkhamIcon[]) =>
	icons.reduce(
		(target, icon) => {
			target[icon.icon] = icon;
			return target;
		},
		{} as Record<string, ArkhamIcon>,
	);
