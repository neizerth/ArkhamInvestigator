import type { ImageBackgroundProps } from "@shared/ui";
import { useTranslation } from "react-i18next";
import * as C from "./RulesBackground.components";

export type RulesBackgroundProps = ImageBackgroundProps;

export const RulesBackground = ({
	children,
	...props
}: RulesBackgroundProps) => {
	const { t } = useTranslation();
	return (
		<C.Container {...props}>
			<C.Content>{children}</C.Content>
			<C.Title>
				<C.TitleText>{t`Rules Reference`}</C.TitleText>
			</C.Title>
		</C.Container>
	);
};
