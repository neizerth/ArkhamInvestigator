import { getInvestigatorImageUrl } from "@shared/api";
import { selectMediaVersion } from "@shared/lib/store";
import type { CodeVersionType, ImageSizeType } from "@shared/model";
import { useAppSelector } from "../store";
import { APP_VERSION, BUILD_VERSION } from "@shared/config/app";

type UseInvestigatorImageUrlOptions = {
  code: string
  type: ImageSizeType
  version?: CodeVersionType
}

export const useInvestigatorImageUrl = ({
  code,
  type,
  version = 'media'
}: UseInvestigatorImageUrlOptions) => {
 
  const mediaVersion = useAppSelector(selectMediaVersion);

  const versions: Record<CodeVersionType, string> = {
    media: mediaVersion || '',
    build: BUILD_VERSION || '',
    codebase: APP_VERSION
  }

  const qs = `v=${versions[version]}`;

  return getInvestigatorImageUrl({
    code,
    type,
    qs
  })
}