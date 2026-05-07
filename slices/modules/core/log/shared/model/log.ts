export type LogType = "today" | "error";
export type LogSeverity = "info" | "error" | "debug" | "warn";

export type LogFile = {
	name: string;
	date: string;
	path: string;
	modificationTime: number;
};
