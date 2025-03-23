import { ContentPage } from '@widgets/content-page';
import * as C from './HelpPage.components';
import { useAppTranslation } from '@features/i18n';
import { List, Paragraph, Text, Title, Bold } from '@shared/ui';

export type HelpPageProps = {

}

export const HelpPage = ({}: HelpPageProps) => {
  const { t } = useAppTranslation();
  return (
    <ContentPage
      title={t`Help`}
    >
      <Title>{t`Scroll`}</Title>
      <Text>{t`board.help.scroll`}</Text>

      <Title>{t`Short Press`}</Title>
      <Text>
        <C.Icon icon='health'/>, <C.Icon icon='sanity'/>, <C.Icon icon='resource'/>, <C.Icon icon='clue'/>{' - '}
        {t`board.help.press.main`}
      </Text>
      <Text>
        <C.Icon icon='action'/>{' - '}
        {t`board.help.press.action`}
      </Text>
      <Text>
        <C.Icon icon='willpower'/>, <C.Icon icon='intellect'/>, <C.Icon icon='combat'/>, <C.Icon icon='agility'/>{' - '}
        {t`board.help.press.skills`}
      </Text>
      <Text>
        <C.Icon icon='undo'/>{' - '}
        {t`board.help.press.undo`}
      </Text>
      <Text>
        <C.Icon icon='redo'/>{' - '}
        {t`board.help.press.redo`}
      </Text>
      <Text>
        <C.Icon icon='repeat'/>{' - '}
        {t`board.help.press.reset`}
      </Text>

      <Title>{t`Press and hold`}</Title>
      <Text>
        {t`board.help.hold.freeArea`}
      </Text>

      <Title>{t`Long Press`}</Title>
      <Text>
        <C.Icon icon='health'/>, <C.Icon icon='sanity'/>, <C.Icon icon='action'/>{' - '}
        {t`board.help.longPress.main`}
      </Text>
      <Text>
        <C.Icon icon='resource'/>, <C.Icon icon='clue'/>{' - '}
        {t`board.help.longPress.secondary`}
      </Text>
      <Text>
        <C.Icon icon='undo'/>{' - '}
        {t`board.help.longPress.undo`}
      </Text>
      <Text>
        <C.Icon icon='redo'/>{' - '}
        {t`board.help.longPress.redo`}
      </Text>

      <Title>{t`Calculator`}</Title>
      <Text>
        <C.Icon icon='history'/> / <C.Icon icon='calculator'/>{' - '}
        {t`board.help.calculator.toggleKeyboard`}
      </Text>
      <Text>
        <C.Icon icon='trash'/>{' - '}
        {t`board.help.calculator.clearHistory`}
      </Text>

      <Title>{t`Investigator Special Actions`}</Title>
      <Text>
        <C.Icon icon='per_investigator'/>{' - '}
        {t`board.help.special.additionalAction`}
      </Text>
      <List>
        <List.Item>
          <Bold>{t`Lola Hayes`}</Bold>: {t`board.help.special.lola`}
        </List.Item>
      </List>
    </ContentPage>
  );
}