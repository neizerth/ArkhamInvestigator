import type { Box, BoxLayout } from "@shared/model/ui";
import type { InvestigatorImage } from "arkham-investigator-data";
import type { HeaderLayout } from "@pages/board/model";
import { getScaledMedia } from "./getScaledMedia";
import type { InvestigatorPicture } from "@shared/model";
import { ascend, head, prop, sortWith } from "ramda";

type GetImageLayout = {
  layout: HeaderLayout
  box: Box
  picture: InvestigatorPicture
}

export const getBackgroundLayout = (options: GetImageLayout) => {
  // const media = getScaledMedia(options)
  const layouts = getScaledMedia(options);

  const layout = head(
    sortWith(
      [ascend(prop('scale'))],
      layouts
    )
  )

  return layout || null
}
