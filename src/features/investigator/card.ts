import { isMainCampaign } from "@/store/features/stories/criteria";
import { IInvestigator, IStory } from "@/types/api";

export const getCardIndex = ({
  investigator,
  story
}: {
  investigator: IInvestigator
  story: IStory
}) => {
  if (story.is_official && isMainCampaign(story)) {
    const storyPositionSize = (story.position || 0).toString().length;

    return investigator.code
      .slice(storyPositionSize)
      .replace(/^0*/, '');
  }
  return investigator.position;
}