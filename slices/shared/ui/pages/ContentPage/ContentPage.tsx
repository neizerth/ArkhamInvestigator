import { goBack, useAppDispatch } from '@shared/lib';
import { Page, type PageProps } from '../Page';
import * as C from './ContentPage.components';
import { useCallback } from 'react';
import { TopBar } from '@widgets/top-bar';
import { ContentPageProps } from './ContentPage.types';

export { ContentPageProps };

export const ContentPage = ({
  title,
  full,
  children,
  ...props
}: ContentPageProps) => {

  const dispatch = useAppDispatch();
  
  const back = useCallback(() => {
    dispatch(goBack())
  }, [dispatch])

  const Content = full ? C.FullContent : C.Content;

  return (
    <Page {...props}>
      <TopBar 
        title={title} 
        onBack={back}
      />
      <Content>
        {children}
      </Content>
    </Page>
  );
}