import { useAppTranslation } from '@features/i18n';
import { nbsp, space, wordJoiner } from '@shared/config';
import { APP_VERSION } from '@shared/config/app';
import { ContentPage, Title, Text, List, Paragraph, A, Bold } from '@shared/ui';
import * as Application from 'expo-application';

export type AboutPageProps = {

}

export const AboutPage = ({}: AboutPageProps) => {
  const { t } = useAppTranslation();

  return (
    <ContentPage title={t`About`}>
      <Paragraph>
        The information presented in this app about 
        {space}<A href="https://www.fantasyflightgames.com/en/products/arkham-horror-the-card-game/">Arkham Horror: The Card Game{wordJoiner}™</A>, 
        both textual and graphical, is{nbsp}©{nbsp}Fantasy Flight Games. 
        This app is a fan project and is not produced, endorsed, or supported by, or affiliated with Fantasy Flight Games.
      </Paragraph>
      <Paragraph>
        This application was created by <A href="https://github.com/neizerth">Vladimir Yazykov</A> and contributors to 
        support the Arkham Horror: The Card Game community. 
        The source code of this project is available at <A href="https://github.com/neizerth/ArkhamInvestigator">Github</A>. 
        Feedback and bug reports are welcome via Github issues or the dedicated channel on the Mythos Busters discord server.
      </Paragraph>
      <Paragraph>
        All artwork and illustrations are the intellectual property of their respective creators. 
        All Arkham Horror: The Card Game™ images and graphics are copyrighted by Fantasy Flight Games.
      </Paragraph>
      <Title>Hall of Fame</Title>
      <List>
        <List.Item>
          <Bold>@zzorba</Bold>: Icomoon project, re-used Arkham Cards translations
        </List.Item>
        <List.Item>
          <Bold>@kamalisk & ArkhamDB crew</Bold>: Structured game data
        </List.Item>
        <List.Item>
          <Bold>@coldtoes</Bold>: Artwork repository
        </List.Item>
        <List.Item>
          <Bold>@helios_sunrise</Bold>: Layered investigator arts
        </List.Item>
        <List.Item>
          <Bold>@hauke</Bold>: some AI-uncropped investigator images
        </List.Item>
        <List.Item>
          <Bold>@felice</Bold>: investigator card scans
        </List.Item>
      </List>
      <Title>Credits</Title>
      <List>
        <List.Item>
          <Bold>Card icons</Bold>: Fantasy Flight Games
        </List.Item>
        <List.Item>
          <Bold>Re-used ArkhamCards icons</Bold>: Eugene Sarnetsky
        </List.Item>
        <List.Item>
          <Bold>Button Vector Art</Bold>: vecteezy.com
        </List.Item>
      </List>
      <Title>Special Thanks</Title>
      <List>
        <List.Item>
          Thanks to my wife Elisabeth for her understanding and support. I'm the happiest man on the Earth. Because of her
        </List.Item>
      </List>
      <Title>Application Info</Title>
      <List>
        <List.Item>
          <Bold>Build Version</Bold>: {Application.nativeApplicationVersion}
        </List.Item>
        <List.Item>
          <Bold>Build Id</Bold>: {Application.nativeBuildVersion}
        </List.Item>
        <List.Item>
          <Bold>Codebase Version</Bold>: {APP_VERSION}
        </List.Item>
      </List>
    </ContentPage>
  );
}