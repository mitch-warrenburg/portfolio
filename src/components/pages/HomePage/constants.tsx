import { Tab } from '../../molecules/Tabs';
import { MenuItem } from '../../molecules/Menu';
import Icon from '../../atoms/Icon';
import React from 'react';
import { HeaderTabId, TechMenuItemId } from './types';
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
];

export const techMenuItems: Array<MenuItem<TechMenuItemId>> = [
  {
    id: 'react',
    content: (
      <>
        <Icon icon="react" prefix="fab" style={{ marginRight: '8px' }} />
        <span>React</span>
      </>
    ),
  },
  {
    id: 'scss',
    content: (
      <>
        <Icon icon="sass" prefix="fab" style={{ marginRight: '8px' }} />
        <span>SCSS</span>
      </>
    ),
  },
  {
    id: 'spring',
    content: (
      <>
        <Icon icon="leaf" style={{ marginRight: '8px' }} />
        <span>Spring</span>
      </>
    ),
  },
  {
    id: 'java',
    content: (
      <>
        <Icon icon="java" prefix="fab" style={{ marginRight: '8px' }} />
        <span>Java</span>
      </>
    ),
  },
];

export const terminalCommands: Array<TerminalCommand> = [
  {
    simulateCommandProcessMs: 1500,
    input: `curl 'https://mitch.engineer/api/v1/messages' -d 'message=im mitch.  i write code.'`,
    output: `{"status": 200, "result": "SUCCESS"}`,
  },
];
