import { IInvestigator, IStory } from "@/types/api"
import { prop } from "ramda"

type Value = {
  story: IStory
  investigator: IInvestigator
}
export const getStoryDuplicates = ({
  value,
  values
}: {
  value: Value,
  values: Value[]
}) => {
  return values
    .filter(
      ({ story, investigator }) => story === value.story && 
        investigator.name === value.investigator.name &&
        investigator.code !== value.investigator.code
    )
    .map(prop('investigator'));
}