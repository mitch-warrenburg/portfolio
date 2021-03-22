import React from 'react';
import Icon from '../../atoms/Icon';
import FlexBox from '../../atoms/FlexBox';
import { Tab } from '../../molecules/Tabs';
import { Dispatch } from '@reduxjs/toolkit';
import { MenuItem } from '../../molecules/Menu';
import { History, LocationState } from 'history';
import { HeaderTabId, TechMenuItemId } from './types';
import { setIsChatOpen } from '../../../store/state/uiSlice';
import { TerminalCommand } from '../../organisms/TerminalEmulator';

export const headerTabs: Array<Tab<HeaderTabId>> = [
  {
    id: 'home',
    content: 'Home',
  },
  {
    id: 'skills',
    content: 'Skills',
  },
  {
    id: 'notable-work',
    content: 'Notable Work',
  },
  {
    id: 'experience',
    content: 'Experience',
  },
  {
    id: 'contact',
    content: 'Contact',
  },
];

export const techMenuItems: Array<MenuItem<TechMenuItemId>> = [
  {
    id: 'react',
    content: (
      <>
        <Icon icon="react" prefix="fab" />
        <FlexBox justify="flex-start" margin="0 0 0 8px">
          React
        </FlexBox>
      </>
    ),
  },
  {
    id: 'scss',
    content: (
      <>
        <Icon icon="sass" prefix="fab" />
        <FlexBox justify="flex-start" margin="0 0 0 8px">
          SCSS
        </FlexBox>
      </>
    ),
  },
  {
    id: 'spring',
    content: (
      <>
        <Icon icon="leaf" />
        <FlexBox justify="flex-start" margin="0 0 0 8px">
          Spring
        </FlexBox>
      </>
    ),
  },
  {
    id: 'java',
    content: (
      <>
        <Icon icon="java" prefix="fab" />
        <FlexBox justify="flex-start" margin="0 0 0 8px">
          Java
        </FlexBox>
      </>
    ),
  },
];

export const contactMenuItems = (dispatch: Dispatch) => [
  {
    id: 'email',
    content: (
      <>
        <Icon icon="envelope" />
        <FlexBox justify="flex-start" margin="0 0 0 8px">
          Email
        </FlexBox>
      </>
    ),
  },
  {
    id: 'chat',
    content: (
      <>
        <Icon icon="comments" />
        <FlexBox justify="flex-start" margin="0 0 0 8px">
          Chat Now!
        </FlexBox>
      </>
    ),
    onClick: () => dispatch(setIsChatOpen(true)),
  },
];

export const adminMenuItems = (history: History<LocationState>) => [
  {
    id: 'replay-intro',
    content: (
      <>
        <Icon icon="play" />
        <FlexBox justify="flex-start" margin="0 0 0 8px">
          Replay Intro
        </FlexBox>
      </>
    ),
    onClick: () => history.push('/admin'),
  },
  {
    id: 'admin-console',
    content: (
      <>
        <Icon icon="user-lock" />
        <FlexBox justify="flex-start" margin="0 0 0 8px">
          Access Admin Console
        </FlexBox>
      </>
    ),
    onClick: () => history.push('/admin'),
  },
];

export const terminalCommands: Array<TerminalCommand> = [
  {
    simulateCommandProcessMs: 1500,
    input: `curl 'https://mitch.engineer/api/v1/messages' -d 'message=im mitch.  i write code.'`,
    output: `{"status": 200, "result": "SUCCESS"}`,
  },
];
