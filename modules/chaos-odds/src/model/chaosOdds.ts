export type OnLoadEventPayload = {
	url: string;
};

export type ChaosOddsModuleEvents = {
	onChange: (params: ChangeEventPayload) => void;
};

export type ChangeEventPayload = {
	value: string;
};
