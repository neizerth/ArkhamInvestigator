import { getInvestigatorImageUrl } from "@shared/api";
import { selectMediaVersion } from "@shared/lib/store";
import type { AppVersionType, ImageSizeType } from "@shared/model";
import { useAppSelector } from "../store";
import { APP_VERSION, BUILD_VERSION } from "@shared/config/app";
import { v4 } from "uuid";
import { useMemo } from "react";


type Version = AppVersionType | 'v4';
type UseInvestigatorImageUrlOptions = {
  code: string
  type: ImageSizeType
  version?: Version
}

export const useInvestigatorImageUrl = ({
  code,
  type,
  version = 'v4'
}: UseInvestigatorImageUrlOptions) => {
 
  const mediaVersion = useAppSelector(selectMediaVersion);

  const v4Id = useMemo(() => v4(), [])

  const versions: Record<Version, string> = {
    media: mediaVersion || '',
    build: BUILD_VERSION || '',
    codebase: APP_VERSION,
    v4: v4Id
  }

  const qs = `v=${versions[version]}`;

  return getInvestigatorImageUrl({
    code,
    type,
    qs
  })
}