import { IInvestigator, IStory } from '@/types/api';
import S from './InvestigatorSelect.module.scss';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { Block, Icon } from '@/components';
import { ascend } from 'ramda';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectStories } from '@/store/features/stories/stories';
import { getStoryDuplicates } from '@/features/investigator/duplicates';
import { getCardIndex } from '@/features/investigator/card';
import supportedInvestigators from '@/data/supportedInvestigators.json';
import { propIn } from '@/features/criteria/common';

export type InvestigatorSelectProps = {
  story?: IStory
  onChange: (investigator: IInvestigator) => void
}

export const InvestigatorSelectLabel = ({ 
  investigator,
  showStoryName = true,
  duplicates,
  story
}: {
  story: IStory
  showStoryName?: boolean
  investigator: IInvestigator
  duplicates: IInvestigator[]
}) => {
  const { t } = useTranslation();
  const { 
    name, 
    faction_code 
  } = investigator;
  const faction = faction_code === 'mystic' ? 'mystic_alt' : faction_code;

  const id = getCardIndex({
    investigator,
    story
  });
  return (
    <Block className={S.label}>
      <Block className={S.labelMain}>
        <Block className={S.icon}>
          <Icon icon={faction}/>
        </Block>
        {t(name)} 
        {duplicates.length > 0 && (
          <> #{id}</>
        )}
      </Block>
      {showStoryName && (
        <Block className={S.story}>
          {story.icon && <Icon icon={story.icon}/>}
          {t(story.name)}
        </Block>
      )}
    </Block>
  )
}
export const InvestigatorSelect = ({
  story,
  onChange
}: InvestigatorSelectProps) => {
  const { t } = useTranslation();
  const stories = useAppSelector(selectStories);
  const source = story ? [story] : stories;

  const data = source
    .map(story => {
      return story.investigators
        .filter(propIn('code', supportedInvestigators))
        .map(investigator => ({
          story,
          investigator
        }))
    })
    .flat()
    .sort(
      ascend(({ investigator }) => t(investigator.name))
    );

  // const investigators = story?.investigators || data;
  const options = data.map(value => ({
    label: (
      <InvestigatorSelectLabel 
        {...value}
        showStoryName={!story}
        duplicates={getStoryDuplicates({
          value,
          values: data
        })}
      />
    ),
    value: value.investigator
  }));

  return (
    <Select
      placeholder={t('Choose Investigator')}
      className={S.select}
      options={options}
      onChange={item => item && onChange(item.value)}
    />
  );
}