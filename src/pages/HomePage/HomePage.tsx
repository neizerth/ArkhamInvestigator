import { Button, LanguageSelect } from '@/components';
import S from './HomePage.module.scss';
import { Col, Block, StorySelect, Container, InvestigatorSelect, Page } from '@/components';
import type { IInvestigator, IStory } from '@/types/api';
import { useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectStories } from '@/store/features/stories/stories';
import { useTranslation } from 'react-i18next';
import type { Nullable } from '@/types/common';
import { useNavigate } from 'react-router-dom';
import { getInvestigatorRoute } from '@/features/routes/routes';
import { selectLanguage } from '@/store/features/language/language';

export const HomePage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const stories = useAppSelector(selectStories);
  const language = useAppSelector(selectLanguage);

  const [story, setStory] = useState<IStory>();
  const selectStory = (selectedStory?: IStory) => {
    setStory(selectedStory);
    setInvestigator(null);
  }
  const [investigator, setInvestigator] = useState<Nullable<IInvestigator>>(null);

  const start = () => investigator && navigate(getInvestigatorRoute({
    language,
    id: investigator?.code
  }));

  return (
    <Page>
      <Block className={S.container}>
        <Container>
          <Col className={S.row}>
            <LanguageSelect/>
            <StorySelect
              data={stories}
              className={S.story}
              onChange={selectStory}
            />
            <InvestigatorSelect 
              story={story}
              onChange={setInvestigator}
            />
            
            {investigator && (
              <Button 
                onClick={start}
                className={S.start}
              >
                {t('Start')}
              </Button>
            )}
          </Col>
        </Container>
      </Block>
    </Page>
  );
}