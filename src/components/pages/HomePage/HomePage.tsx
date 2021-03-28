import React, { FC, useMemo, useCallback, useRef } from 'react';
import Nav from '../../atoms/Nav';
import Panel from '../../atoms/Panel';
import Menu from '../../molecules/Menu';
import FlexBox from '../../atoms/FlexBox';
import Optional from '../../atoms/Optional';
import Section from '../../molecules/Section';
import { RootState } from '../../../store/types';
import { History, LocationState } from 'history';
import AppHeader from '../../organisms/AppHeader';
import styled, { useTheme } from 'styled-components';
import EmailEditor from '../../organisms/EmailEditor';
import { useSelector, useDispatch } from 'react-redux';
import PageTemplate from '../../templates/PageTemplate';
import Notification from '../../organisms/Notification';
import { useHistory, Switch, Route } from 'react-router-dom';
import TerminalEmulator from '../../organisms/TerminalEmulator';
import {
  setIsChatOpen,
  setHasRunIntro,
  setIsChatMinimized,
} from '../../../store/state/uiSlice';
import {
  adminMenuItems,
  terminalCommands,
  contactMenuItems,
  aboutAppMenuItems,
} from './constants';

const PanelContentContainer = styled.div`
  display: flex;
  overflow: auto;
  width: 100%;
  height: calc(100vh - 122px);
  flex-direction: column;
  align-items: center;
  padding: 20px 40px;

  @media screen and (max-width: 720px) {
    height: calc(100vh - 58px);
    padding: 20px 10px 0 10px;
  }
`;

const MobileFooterContainer = styled.div`
  z-index: 4;
  display: flex;
  width: 100vw;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 32px 32px 100px 32px;
  background: ${({theme}) => theme.colors.background.modal};

  @media screen and (min-width: 721px) {
    display: none;
  }
`;

const MobileFooter = styled.div`
  display: grid;
  width: 100%;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  justify-items: center;

  @media screen and (max-width: 480px) {
    justify-items: start;
  }
`;

const HomePage: FC = () => {
  const theme = useTheme();
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

  return (
    <Optional renderIf={hasRunIntro}>
      <PageTemplate>
        <Panel>
          <AppHeader />
          <FlexBox align="stretch" justify="stretch">
            <Nav>
              <Menu label="About this App" items={aboutAppItems} />
              <Menu label="Get in Touch" items={contactItems} />
              <Menu label="Administration" items={adminItems} />
            </Nav>
            <PanelContentContainer ref={panelContentRef} className="wow">
              <TerminalEmulator commands={terminalCommands} />
              <Switch>
                <Route exact path="/app">
                  <Section header="About Me">Stuff about me</Section>
                </Route>
                <Route path="/app/contact">
                  <Section header="Chat">
                    <Notification
                      themeColor={theme.colors.theme.primary}
                      button={{
                        transparent: true,
                        onClick: openChat,
                        text: 'Open Messenger',
                      }}
                      icon={{
                        size: 'lg',
                        icon: 'comments',
                      }}
                      message="Chat Now!"
                    />
                  </Section>
                  <Section header="Contact Me">
                    <EmailEditor />
                  </Section>
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
              <MobileFooterContainer>
                <MobileFooter>
                  <Menu label="About this App" items={aboutAppItems} />
                  <Menu label="Get in Touch" items={contactItems} />
                  <Menu label="Administration" items={adminItems} />
                </MobileFooter>
              </MobileFooterContainer>
            </PanelContentContainer>
          </FlexBox>
        </Panel>
      </PageTemplate>
    </Optional>
  );
};

export default HomePage;
