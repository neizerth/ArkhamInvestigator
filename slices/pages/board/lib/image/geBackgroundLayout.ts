import type { Box, BoxLayout } from "@shared/model/ui";
import type { InvestigatorImage } from "arkham-investigator-data";
import { getTitleSize } from "./getTitleSize";
import type { HeaderLayout } from "@pages/board/model";

type GetImageLayout = {
  layout: HeaderLayout
  box: Box
  image: InvestigatorImage
}

export const getBackgroundLayout = ({
  layout,
  box,
  image
}: GetImageLayout): BoxLayout => {
  const paddingTop = layout.height;

  return box;
}