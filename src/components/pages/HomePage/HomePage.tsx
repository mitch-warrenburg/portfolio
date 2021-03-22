import React, { FC, useMemo, useState, useCallback, MouseEventHandler } from 'react';
import Nav from '../../atoms/Nav';
import Icon from '../../atoms/Icon';
import { HeaderTabId } from './types';
import Panel from '../../atoms/Panel';
import Header from '../../atoms/Header';
import Menu from '../../molecules/Menu';
import Tabs from '../../molecules/Tabs';
import FlexBox from '../../atoms/FlexBox';
import Editor from '../../organisms/Editor';
import Optional from '../../atoms/Optional';
import Section from '../../molecules/Section';
import { useHistory } from 'react-router-dom';
import RoundImage from '../../atoms/RoundImage';
import { History, LocationState } from 'history';
import styled, { useTheme } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import PageTemplate from '../../templates/PageTemplate';
import FloatingButton from '../../atoms/FloatingButton';
import { RootState, UiState } from '../../../store/types';
import TerminalEmulator from '../../organisms/TerminalEmulator';
import ChatMessengerWidget from '../../organisms/ChatMessenger/ChatMessengerWidget';
import {
  headerTabs,
  techMenuItems,
  adminMenuItems,
  terminalCommands,
  contactMenuItems,
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

const HomePage: FC = () => {
  const theme = useTheme();
  const history: History<LocationState> = useHistory();
  const dispatch = useDispatch();
  const [selectedTabId, setSelectedTabId] = useState<HeaderTabId>('home');
  const { hasRunIntro } = useSelector<RootState, UiState>(({ ui }) => ui);

  const tabClickHandler: MouseEventHandler<HTMLLIElement> = useCallback(event => {
    const { id } = event.target as HTMLLIElement;
    setSelectedTabId(id as HeaderTabId);
  }, []);

  const adminItems = useMemo(() => adminMenuItems(history), []);
  const contactItems = useMemo(() => contactMenuItems(dispatch), []);

  return (
    <Optional renderIf={hasRunIntro}>
      <PageTemplate>
        <FloatingButton>
          <Icon icon="moon" color={theme?.colors.theme.pending} />
        </FloatingButton>
        <Panel>
          <Header>
            <RoundImage alt="profile" src={logo} />
            <Tabs tabs={headerTabs} onClickTab={tabClickHandler} selectedId={selectedTabId} />
          </Header>
          <FlexBox align="stretch" justify="stretch">
            <Nav>
              <Menu label="Get in Touch" items={contactItems} />
              <Menu label="Skills" items={techMenuItems} />
              <Menu label="Administration" items={adminItems} />
            </Nav>
            <PanelContentContainer>
              <TerminalEmulator commands={terminalCommands} />
              <FlexBox direction="column" margin="32px 0 0 0">
                <Section header="Contact Me">
                  <Editor />
                </Section>
              </FlexBox>
              <ChatMessengerWidget />
            </PanelContentContainer>
          </FlexBox>
        </Panel>
      </PageTemplate>
    </Optional>
  );
};

export default HomePage;
