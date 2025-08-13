import { ErrorBoundary } from "@shared/ui";
import { ErrorView } from "@widgets/content";
import type { PropsWithChildren } from "react";

export const ErrorProvider = ({ children }: PropsWithChildren) => {
	return <ErrorBoundary Fallback={ErrorView}>{children}</ErrorBoundary>;
};
