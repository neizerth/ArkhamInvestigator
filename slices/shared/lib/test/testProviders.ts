import type { ComponentType, PropsWithChildren } from "react";

export type TestProviders = ComponentType<PropsWithChildren>;

let defaultProviders: TestProviders | undefined;

export const setDefaultTestProviders = (providers: TestProviders) => {
	defaultProviders = providers;
};

export const getDefaultTestProviders = () => defaultProviders;
