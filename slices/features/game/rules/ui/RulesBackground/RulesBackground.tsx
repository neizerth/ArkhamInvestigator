import { useAppTranslation } from "@modules/i18n/shared/lib";
import type { ImageBackgroundProps } from "@shared/ui";
import * as C from "./RulesBackground.components";

export type RulesBackgroundProps = ImageBackgroundProps;

export const RulesBackground = ({
	children,
	...props
}: RulesBackgroundProps) => {
	const { t } = useAppTranslation();
	return (
		<C.Container {...props}>
			<C.Content>{children}</C.Content>
			<C.Title>
				<C.TitleText>{t`Rules Reference`}</C.TitleText>
			</C.Title>
		</C.Container>
	);
};
