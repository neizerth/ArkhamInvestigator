import type { AppVersionType, ImageSizeType } from "@shared/model";
import { useMemo } from "react";
import { v4 } from "uuid";
import { getInvestigatorImageUrl } from "../../../api";
import { APP_VERSION, BUILD_VERSION } from "../../../config/app";
import { selectMediaVersion } from "../../store";
import { useAppSelector } from "../store";

type Version = AppVersionType | "v4" | "random";
type UseInvestigatorImageUrlOptions = {
	code: string;
	type: ImageSizeType;
	version?: Version;
};

export const useInvestigatorImageUrl = ({
	code,
	type,
	version = "media",
}: UseInvestigatorImageUrlOptions) => {
	const mediaVersion = useAppSelector(selectMediaVersion);

	const v4Id = useMemo(() => v4(), []);

	const versions: Record<Version, string> = {
		media: mediaVersion || "",
		build: BUILD_VERSION || "",
		codebase: APP_VERSION,
		v4: v4Id,
		random: Math.random().toString(36).slice(2),
	};

	const qs = `v=${versions[version]}`;

	return getInvestigatorImageUrl({
		code,
		type,
		qs,
	});
};
