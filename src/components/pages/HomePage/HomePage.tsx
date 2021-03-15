import React, { FC, useState, useCallback, MouseEventHandler, useEffect } from 'react';
import Nav from '../../atoms/Nav';
import Icon from '../../atoms/Icon';
import List from '../../atoms/List';
import { HeaderTabId } from './types';
import Panel from '../../atoms/Panel';
import Header from '../../atoms/Header';
import Button from '../../atoms/Button';
import Menu from '../../molecules/Menu';
import Tabs from '../../molecules/Tabs';
import FlexBox from '../../atoms/FlexBox';
import { useSelector } from 'react-redux';
import Optional from '../../atoms/Optional';
import ListItem from '../../atoms/ListItem';
import Section from '../../molecules/Section';
import { useHistory } from 'react-router-dom';
import RoundImage from '../../atoms/RoundImage';
import styled, { useTheme } from 'styled-components';
import PageTemplate from '../../templates/PageTemplate';
import FloatingButton from '../../atoms/FloatingButton';
import StatusIndicator from '../../atoms/StatusIndicator';
import { RootState, UiState } from '../../../store/types';
import TerminalEmulator from '../../organisms/TerminalEmulator';
import { headerTabs, techMenuItems, terminalCommands } from './constants';

const PanelContentContainer = styled.div`
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  height: 100%;
  overflow: auto;
  @media screen and (max-width: 510px) {
    padding: 20px;
  }
`;

const HomePage: FC = () => {
  const theme = useTheme();
  const history = useHistory();
  const [selectedTabId, setSelectedTabId] = useState<HeaderTabId>('home');
  const { hasRunIntro } = useSelector<RootState, UiState>(({ ui }) => ui);

  const tabClickHandler: MouseEventHandler<HTMLLIElement> = useCallback(event => {
    const { id } = event.target as HTMLLIElement;
    setSelectedTabId(id as HeaderTabId);
  }, []);

  useEffect(() => {
    if (!hasRunIntro) {
      history.push('/');
    }
  }, [hasRunIntro]);

  return (
    <Optional renderIf={hasRunIntro}>
      <PageTemplate>
        <FloatingButton>
          <Icon icon="moon" color={theme?.colors.theme.pending} />
        </FloatingButton>
        <Panel>
          <Header>
            <RoundImage
              alt="profile"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAsgdTSZ7dH8pad4__eB_eqc0NBI3Hc-Hx-Q&usqp=CAU"
            />
            <Tabs tabs={headerTabs} onClickTab={tabClickHandler} selectedId={selectedTabId} />
          </Header>
          <FlexBox align="stretch" justify="stretch">
            <Nav>
              <Menu label="Skills" items={techMenuItems} />
            </Nav>
            <PanelContentContainer>
              <TerminalEmulator commands={terminalCommands} />
              <Section title="Installed">
                <List>
                  <ListItem>
                    <FlexBox justify="space-between">
                      <StatusIndicator status="active">Active</StatusIndicator>
                      <Button transparent>Open</Button>
                    </FlexBox>
                  </ListItem>
                  <ListItem>
                    <FlexBox justify="space-between">
                      <StatusIndicator status="active">Update Available</StatusIndicator>
                      <Button>Do Something Crazy</Button>
                    </FlexBox>
                  </ListItem>
                </List>
              </Section>
            </PanelContentContainer>
          </FlexBox>
        </Panel>
      </PageTemplate>
    </Optional>
  );
};

export default HomePage;
