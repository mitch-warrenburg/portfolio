import React from 'react';
import { ScheduledEventBlockProps } from './types';
import styled from 'styled-components';

const ScheduledEventBlock = styled.div<ScheduledEventBlockProps>`
  width: 100%;
  min-height: 16px;
  padding: ${({ view }) => ('dayGridMonth' === view ? '2px 0 0 2px' : '0')};
  border: 1px solid
    ${({ view, borderColor }) => ('dayGridMonth' === view ? borderColor : 'transparent')};
  margin: ${({ view }) => ('dayGridMonth' === view ? '2px' : '-2px 0 0 8px')};
  background-color: ${({ view, backgroundColor }) =>
    'dayGridMonth' === view ? backgroundColor : 'transparent'};
  border-radius: 3px;
  font-size: 14px;
  font-style: italic;
  white-space: pre-wrap;

  @media screen and (max-width: 780px), screen and (max-height: 600px) {
    font-size: 12px;
  }
`;

export default ScheduledEventBlock;
