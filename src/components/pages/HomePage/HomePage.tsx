import React, { FC, useMemo, useCallback } from 'react';
import Nav from '../../atoms/Nav';
import Panel from '../../atoms/Panel';
import Menu from '../../molecules/Menu';
import FlexBox from '../../atoms/FlexBox';
import Optional from '../../atoms/Optional';
import Section from '../../molecules/Section';
import { History, LocationState } from 'history';
import AppHeader from '../../organisms/AppHeader';
import styled, { useTheme } from 'styled-components';
import EmailEditor from '../../organisms/EmailEditor';
import { useSelector, useDispatch } from 'react-redux';
import PageTemplate from '../../templates/PageTemplate';
import Notification from '../../organisms/Notification';
import { RootState, UiState } from '../../../store/types';
import { useHistory, Switch, Route } from 'react-router-dom';
import TerminalEmulator from '../../organisms/TerminalEmulator';
import { setIsChatMinimized, setIsChatOpen } from '../../../store/state/uiSlice';
import ChatMessengerWidget from '../../organisms/ChatMessenger/ChatMessengerWidget';
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
  height: calc(90vh - 58px);
  flex-direction: column;
  align-items: center;
  padding: 20px 40px;

  @media screen and (max-width: 720px) {
    height: calc(100vh - 58px);
    padding: 20px 10px 160px 10px;
  }
`;

const HomePage: FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const history: History<LocationState> = useHistory();
  const { hasRunIntro } = useSelector<RootState, UiState>(({ ui }) => ui);

  const messengerButtonClickHandler = useCallback(() => {
    dispatch(setIsChatOpen(true));
    dispatch(setIsChatMinimized(false));
  }, []);

  const adminItems = useMemo(() => adminMenuItems(history), []);
  const contactItems = useMemo(() => contactMenuItems(dispatch), []);
  const aboutAppItems = useMemo(() => aboutAppMenuItems(history, dispatch), []);

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
            <PanelContentContainer>
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
                        text: 'Open Messenger',
                        onClick: messengerButtonClickHandler,
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
              </Switch>
            </PanelContentContainer>
          </FlexBox>
        </Panel>
        <ChatMessengerWidget />
      </PageTemplate>
    </Optional>
  );
};

export default HomePage;
