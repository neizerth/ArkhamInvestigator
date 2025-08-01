import { whereId } from "@shared/lib/util";
import type { SFXWorkerInfo } from "../../../model";

type Options = {
	id: string;
	sfxWorkers: SFXWorkerInfo[];
};

export const getSFXWorkerByid = ({ id, sfxWorkers }: Options) =>
	sfxWorkers.find(whereId(id));
