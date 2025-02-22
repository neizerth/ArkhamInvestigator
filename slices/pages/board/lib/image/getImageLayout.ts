import type { Box, BoxLayout } from "@shared/model/ui";
import type { InvestigatorImage } from "arkham-investigator-data";
import { getTitleSize } from "./getTitleSize";

type GetImageLayout = {
  box: Box
  image: InvestigatorImage
}

export const getImageLayout = ({
  box,
  image
}: GetImageLayout): BoxLayout => {
  const paddingTop = getTitleSize(box).height;

  return box;
}