import S from './StorySelect.module.scss';
import Select from 'react-select';

import { IStory } from '@/types/api';
import { StorySelectOption } from '../StorySelectOption/StorySelectOption';
import { StorySelectSingleValue } from '../StorySelectSingleValue/StorySelectSingleValue';
import { ascend, descend, prop, sortWith, T } from 'ramda';
import { PropsWithClassName } from '@/types/ui';
import classNames from 'classnames';
import { Block } from '@/components';
import { useTranslation } from 'react-i18next';
import { isChallenge, isSideContent, isCampaign } from '@/store/features/stories/criteria';

export type StorySelectProps = PropsWithClassName & {
  onChange: (story?: IStory) => void
  data: IStory[]
}

export const StorySelect = ({ 
  className,
  onChange,
  ...props
}: StorySelectProps) => {
  const { t } = useTranslation();

  const data = sortWith([
    ascend(({ position }) => position || Infinity),
    descend(({ is_official }) => Boolean(is_official)),
    ascend(prop('name'))
  ], props.data)

  const labels = data.reduce((target, story) => {
    const { name, code } = story;
    target.set(code, t(name, story));
    return target;
  }, new Map);

  const mapStory = (story: IStory) => ({
    label: t(story.name, story),
    value: story
  });
  
  const getOptions = (filter: (story: IStory) => boolean) => {
    const stories = data.filter(filter);
    return stories.map(mapStory);
  }

  const campaigns = getOptions(isCampaign)
  const sideContent = getOptions(isSideContent)
  const challenges = getOptions(isChallenge);
  const isRest = (story: IStory) => 
    !isCampaign(story) && 
    !isSideContent(story) && 
    !isChallenge(story);

  const rest = getOptions(isRest);

  const groups = [
    {
      label: t('Campaigns'),
      options: campaigns
    },
    {
      label: t('Side Scenarios'),
      options: sideContent
    },
    {
      label: t('Challenge Scenarios'),
      options: challenges
    },
    {
      label: t('Other'),
      options: rest
    }
  ]

  const components = { 
    Option: StorySelectOption,
    SingleValue: StorySelectSingleValue
  }

  return (
    <Block className={classNames(S.container, className)}>
      <Select
        isMulti={false}
        isClearable={true}
        onChange={item => onChange(item?.value)}
        className={classNames(S.select)}
        placeholder={t('Campaign')}
        options={groups}
        getOptionLabel={({ value }) => labels.get(value.code)}
        components={components}
      />
    </Block>
  );
}