import { PlatformFragment, Title } from "@shared/ui";
import {
	ContentPage,
	type ContentPageProps,
} from "@widgets/content/content-page";
import { useTranslation } from "react-i18next";
import * as C from "./SupportPage.components";
import { contactLinks, donateLinks } from "./links";

export type SupportPageProps = Omit<ContentPageProps, "title">;
export const SupportPage = (props: SupportPageProps) => {
	const { t } = useTranslation();

	return (
		<ContentPage {...props} title="Support">
			<Title>{t`Contact us`}</Title>
			<C.List>
				{contactLinks.map((item) => (
					<C.Button key={item.id} {...item} />
				))}
			</C.List>
			<C.Cthulhu />
			<PlatformFragment except="ios">
				<C.List>
					{donateLinks.map((item) => (
						<C.Button key={item.id} {...item} />
					))}
				</C.List>
			</PlatformFragment>
		</ContentPage>
	);
};
