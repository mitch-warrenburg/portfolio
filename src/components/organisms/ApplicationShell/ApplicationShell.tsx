import React, { FC, useMemo, useRef, useCallback } from 'react';
import NavBar from '../NavBar';
import AppHeader from '../AppHeader';
import styled from 'styled-components';
import MobileFooter from '../MobileFooter';
import Optional from '../../atoms/Optional';
import Section from '../../molecules/Section';
import { RootState } from '../../../store/types';
import { History, LocationState } from 'history';
import ContactPage from '../../pages/ContactPage';
import TerminalEmulator from '../TerminalEmulator';
import { useDispatch, useSelector } from 'react-redux';
import PageTemplate from '../../templates/PageTemplate';
import { Switch, useHistory, Route } from 'react-router-dom';
import {
  adminMenuItems,
  contactMenuItems,
  terminalCommands,
  aboutAppMenuItems,
  APP_SHELL_MARGIN,
  APP_HEADER_HEIGHT,
} from './constants';
import {
  setIsChatOpen,
  setHasRunIntro,
  setIsChatMinimized,
} from '../../../store/state/uiSlice';

const Shell = styled.div`
  position: relative;
  overflow: hidden;
  max-width: 1280px;
  height: calc(100% - ${APP_SHELL_MARGIN}px * 2);
  margin: ${APP_SHELL_MARGIN}px auto;
  background: rgba(16, 18, 27, 0.8);
  border-radius: 14px;

  @media screen and (max-width: 1280px) {
    margin: ${APP_SHELL_MARGIN}px;
  }

  @media screen and (max-width: 720px), screen and (max-height: 600px) {
    height: 100%;
    margin: 0 auto;
    border-radius: 0;

    > main {
      border-radius: 0;
    }
  }
`;

const HeaderContainer = styled.div`
  width: 100%;
  max-width: 100%;
`;

const Main = styled.main`
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  height: calc(100% - ${APP_HEADER_HEIGHT}px);
  margin: 0 auto;
  border-radius: 0 0 14px 14px;
  pointer-events: initial;
`;

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const PageContent = styled.div`
  display: flex;
  width: 100%;
  flex: 2 0 100%;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 20px;

  @media screen and (max-width: 720px), screen and (max-height: 600px) {
    padding: 20px 10px;
  }
`;

const ApplicationShell: FC = () => {
  const dispatch = useDispatch();
  const panelContentRef = useRef<HTMLDivElement>(null);
  const history: History<LocationState> = useHistory();
  const hasRunIntro = useSelector<RootState, boolean>(({ ui }) => ui.hasRunIntro);

  const scrollToTop = useCallback(() => {
    panelContentRef.current?.scrollTo(0, 0);
  }, []);

  const openChat = useCallback(() => {
    dispatch(setIsChatOpen(true));
    dispatch(setIsChatMinimized(false));
    scrollToTop();
  }, []);

  const navToContact = useCallback(() => {
    history.push('/app/contact');
    scrollToTop();
  }, []);

  const navToAdmin = useCallback(() => {
    history.push('/admin');
  }, []);

  const navToAboutApp = useCallback(() => {
    history.push('/app/about-app');
    scrollToTop();
  }, []);

  const replayIntro = useCallback(() => {
    dispatch(setHasRunIntro(false));
    history.push('/');
  }, []);

  const adminItems = useMemo(() => adminMenuItems(navToAdmin), []);
  const contactItems = useMemo(() => contactMenuItems(navToContact, openChat), []);
  const aboutAppItems = useMemo(() => aboutAppMenuItems(replayIntro, navToAboutApp), []);
  const menus = useMemo(
    () => [
      {
        label: 'About this App',
        items: aboutAppItems,
      },
      {
        label: 'Get in Touch',
        items: contactItems,
      },
      {
        label: 'Administration',
        items: adminItems,
      },
    ],
    []
  );

  return (
    <Optional renderIf={hasRunIntro}>
      <Shell>
        <HeaderContainer className="app-shell__header">
          <AppHeader />
        </HeaderContainer>
        <Main className="app-shell__main">
          <PageContainer>
            <NavBar menus={menus} />
            <PageTemplate>
              <PageContent>
                <TerminalEmulator commands={terminalCommands} />
                <Switch>
                  <Route path="/app/contact">
                    <ContactPage openChatFn={openChat} />
                  </Route>
                  <Route exact path="/app">
                    <Section header="About Me">Stuff about me</Section>
                  </Route>
                  <Route path="/app/skills">
                    <Section header="Skills">Okay</Section>
                  </Route>
                  <Route path="/app/notable-work">
                    <Section header="Notable Work">Okay</Section>
                  </Route>
                  <Route path="/app/experience">
                    <Section header="Experience">Okay</Section>
                  </Route>
                  <Route path="/app/about-app">
                    <Section header="What's under the Hood?">BADASS SHIT</Section>
                  </Route>
                </Switch>
              </PageContent>
              <MobileFooter menus={menus} />
            </PageTemplate>
          </PageContainer>
        </Main>
      </Shell>
    </Optional>
  );
};

export default ApplicationShell;
