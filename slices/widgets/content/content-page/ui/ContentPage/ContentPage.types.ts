import type { PageProps } from "@shared/ui";

export type ContentPageProps = PageProps &
	WideProps & {
		title: string;
		onBack?: () => void;
	};

export type WideProps = {
	full?: boolean;
};
