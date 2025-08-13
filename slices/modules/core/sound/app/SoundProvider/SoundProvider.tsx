import { useAppSelector } from "@shared/lib";
import type { PropsWithChildren } from "react";
import { SFXWorker } from "../../entities/sfx/ui";
import { selectSoundEnabled } from "../../shared/lib";
import { useSFXWorkerIds } from "./useSFXWorkerIds";

export type SoundProviderProps = PropsWithChildren & {
	workersCount?: number;
};

export const SoundProvider = ({
	workersCount = 5,
	children,
}: SoundProviderProps) => {
	const enabled = useAppSelector(selectSoundEnabled);
	const ids = useSFXWorkerIds(workersCount);
	if (!enabled) {
		return children;
	}
	return (
		<>
			{children}
			{ids.map((id) => (
				<SFXWorker key={id} id={id} />
			))}
		</>
	);
};
