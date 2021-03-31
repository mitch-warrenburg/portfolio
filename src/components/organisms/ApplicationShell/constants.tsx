import React from 'react';
import Icon from '../../atoms/Icon';
import FlexBox from '../../atoms/FlexBox';
import { TerminalCommand } from '../TerminalEmulator';

export const APP_HEADER_HEIGHT = 58;
export const APP_SHELL_MARGIN = 36;

export const techMenuItems = () => [
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

export const aboutAppMenuItems = (
  onClickReplayIntro: () => any,
  onClickAppInfo: () => any
) => [
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
    onClick: onClickReplayIntro,
  },
  {
    id: 'about-this-app',
    content: (
      <>
        <Icon icon="microchip" />
        <FlexBox justify="flex-start" margin="0 0 0 8px">
          What's Under the Hood?
        </FlexBox>
      </>
    ),
    onClick: onClickAppInfo,
  },
];

export const contactMenuItems = (onClickEmail: () => any, onClickChat: () => any) => [
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
    onClick: onClickEmail,
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
    onClick: onClickChat,
  },
];

export const adminMenuItems = (onClickAdminConsole: () => any) => [
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
    onClick: onClickAdminConsole,
  },
];

export const terminalCommands: ReadonlyArray<TerminalCommand> = [
  {
    simulateCommandProcessMs: 1500,
    input: `curl 'https://mitch.engineer/api/v1/messages' -d 'message=im mitch.  i write code.'`,
    output: `{"status": 200, "result": "SUCCESS"}`,
  },
];
