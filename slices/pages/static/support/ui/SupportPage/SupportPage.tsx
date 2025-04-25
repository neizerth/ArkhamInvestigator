import { useAppTranslation } from "@features/i18n";
import { Title } from "@shared/ui";
import {
	ContentPage,
	type ContentPageProps,
} from "@widgets/content/content-page";
import * as C from "./SupportPage.components";
import { contactLinks, donateLinks } from "./links";

export type SupportPageProps = Omit<ContentPageProps, "title">;
export const SupportPage = (props: SupportPageProps) => {
	const { t } = useAppTranslation();

	return (
		<ContentPage {...props} title="Support">
			<Title>{t`Contact us`}</Title>
			<C.List>
				{contactLinks.map((item) => (
					<C.Button key={item.id} {...item} />
				))}
			</C.List>
			<C.Cthulhu />
			<C.List>
				{donateLinks.map((item) => (
					<C.Button key={item.id} {...item} />
				))}
			</C.List>
		</ContentPage>
	);
};
