import React, { FC, useMemo, useState, useCallback, MouseEventHandler } from 'react';
import Nav from '../../atoms/Nav';
import styled from 'styled-components';
import Panel from '../../atoms/Panel';
import Header from '../../atoms/Header';
import Menu from '../../molecules/Menu';
import Tabs from '../../molecules/Tabs';
import FlexBox from '../../atoms/FlexBox';
import { useLocation } from 'react-router';
import Optional from '../../atoms/Optional';
import Section from '../../molecules/Section';
import RoundImage from '../../atoms/RoundImage';
import { History, LocationState } from 'history';
import EmailEditor from '../../organisms/EmailEditor';
import { useSelector, useDispatch } from 'react-redux';
import PageTemplate from '../../templates/PageTemplate';
import { RootState, UiState } from '../../../store/types';
import { useHistory, Switch, Route } from 'react-router-dom';
import TerminalEmulator from '../../organisms/TerminalEmulator';
import ChatMessengerWidget from '../../organisms/ChatMessenger/ChatMessengerWidget';
import {
  headerTabs,
  adminMenuItems,
  terminalCommands,
  contactMenuItems,
  aboutAppMenuItems,
} from './constants';
import { logo } from '../../../globalConstants';

const PanelContentContainer = styled.div`
  display: flex;
  overflow: auto;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding: 20px 40px;
  @media screen and (max-width: 510px) {
    padding: 20px;
  }
`;

const HomeLogoButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;
`;

const HomePage: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const history: History<LocationState> = useHistory();
  const [selectedTabId, setSelectedTabId] = useState(pathname);
  const { hasRunIntro } = useSelector<RootState, UiState>(({ ui }) => ui);

  const tabClickHandler: MouseEventHandler<HTMLLIElement> = useCallback(event => {
    const { id } = event.target as HTMLLIElement;
    history.push(id);
    setSelectedTabId(id);
  }, []);

  const homeLogoClickHandler = useCallback(() => history.push('/app'), []);

  const adminItems = useMemo(() => adminMenuItems(history), []);
  const contactItems = useMemo(() => contactMenuItems(dispatch), []);
  const aboutAppItems = useMemo(() => aboutAppMenuItems(history, dispatch), []);

  return (
    <Optional renderIf={hasRunIntro}>
      <PageTemplate>
        <Panel>
          <Header>
            <HomeLogoButton>
              <RoundImage alt="profile" src={logo} onClick={homeLogoClickHandler} />
            </HomeLogoButton>
            <Tabs tabs={headerTabs} onClickTab={tabClickHandler} selectedId={selectedTabId} />
          </Header>
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
