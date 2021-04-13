import React, { FC, useMemo, useRef, useCallback, useEffect } from 'react';
import NavBar from '../NavBar';
import AppHeader from '../AppHeader';
import Scheduler from '../Scheduler';
import styled from 'styled-components';
import Divider from '../../atoms/Divider';
import MobileFooter from '../MobileFooter';
import { useLocation } from 'react-router';
import Optional from '../../atoms/Optional';
import AuthFormModal from '../AuthFormModal';
import { History, LocationState } from 'history';
import AboutMePage from '../../pages/AboutMePage';
import ContactPage from '../../pages/ContactPage';
import TerminalEmulator from '../TerminalEmulator';
import AboutAppPage from '../../pages/AboutAppPage';
import { useDispatch, useSelector } from 'react-redux';
import PageTemplate from '../../templates/PageTemplate';
import { RootState, UiState } from '../../../store/types';
import { Switch, useHistory, Route } from 'react-router-dom';
import { useEventCallback, useScrollTop } from '../../../hooks';
import {
  adminMenuItems,
  contactMenuItems,
  terminalCommands,
  aboutAppMenuItems,
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
  max-width: 1920px;
  height: 100%;
  margin: 0 auto;
  background: rgba(16, 18, 27, 0.6);

  @media screen and (max-width: 780px), screen and (max-height: 600px) {
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

const PageContent = styled.div<{ path: string }>`
  display: flex;
  width: 100%;
  flex: 2 0 100%;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: ${({ path }) => (path === '/app/scheduling' ? '10px 0' : '20px 32px')};

  @media screen and (max-width: 780px), screen and (max-height: 600px) {
    padding: ${({ path }) => (path === '/app/scheduling' ? '10px 0' : '20px 10px')};
  }
`;

const ApplicationShell: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const panelContentRef = useRef<HTMLDivElement>(null);
  const history: History<LocationState> = useHistory();
  const { hasRunIntro, isChatOpen, isChatMinimized } = useSelector<RootState, UiState>(
    ({ ui }) => ui
  );

  const scrollToTop = useCallback(() => {
    panelContentRef.current?.scrollTo(0, 0);
  }, []);

  const openChat = useEventCallback(() => {
    if (isChatOpen) {
      dispatch(setIsChatMinimized(!isChatMinimized));
    } else {
      dispatch(setIsChatOpen(true));
      dispatch(setIsChatMinimized(false));
    }
    scrollToTop();
  });

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

  const navToScheduler = useCallback(() => {
    history.push('/app/scheduling');
    scrollToTop();
  }, []);

  const replayIntro = useCallback(() => {
    dispatch(setHasRunIntro(false));
    history.push('/');
  }, []);

  const adminItems = useMemo(() => adminMenuItems(navToAdmin), []);
  const contactItems = useMemo(
    () => contactMenuItems(navToContact, navToScheduler, openChat),
    []
  );
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

  useEffect(() => {
    !hasRunIntro && history.push('/');
  }, [hasRunIntro]);

  useScrollTop();

  return (
    <Optional renderIf={hasRunIntro}>
      <Shell>
        <AuthFormModal />
        <HeaderContainer className="app-shell__header">
          <AppHeader />
        </HeaderContainer>
        <Main className="app-shell__main">
          <PageContainer>
            <NavBar menus={menus} />
            <PageTemplate>
              <PageContent path={pathname}>
                <Optional renderIf={pathname !== '/app/scheduling'}>
                  <TerminalEmulator commands={terminalCommands} />
                  <Divider />
                </Optional>
                <Switch>
                  <Route exact path="/app" component={AboutMePage} />
                  <Route path="/app/contact">
                    <ContactPage openChatFn={openChat} openSchedulerFn={navToScheduler} />
                  </Route>
                  <Route path="/app/scheduling">
                    <Scheduler />
                  </Route>
                  <Route path="/app/about-app" component={AboutAppPage} />
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
