import { useAppSelector } from "@shared/lib";
import { selectBoard } from "../store";
import type { Faction, FactionImages } from "@shared/model";

type ImagesSource = {
  default: FactionImages
  parallel: FactionImages
}

export const useFactionImage = (imagesSource: ImagesSource) => {
  const { investigator, isParallel } = useAppSelector(selectBoard);
  const faction = investigator.faction_code as Faction;

  const images = isParallel ? imagesSource.parallel : imagesSource.default;
  const source = images[faction];

  return source;
}