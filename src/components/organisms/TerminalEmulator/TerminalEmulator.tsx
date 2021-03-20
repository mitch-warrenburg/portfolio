import React, { FC, useCallback, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Cursor from '../../atoms/Cursor';
import CommandRenderer from './CommandRenderer';
import { TerminalCommand, TerminalEmulatorProps } from './types';

const Container = styled.div`
  width: 100%;
  min-height: 200px;
  background-color: rgb(39, 39, 39, 0.7);
  border-radius: 4px;
  font-size: 1rem;
`;

const ControlBar = styled.div`
  display: flex;
  width: 100%;
  height: 24px;
  align-items: center;
  justify-content: flex-start;
  background-color: #bbbbbb;
  border-radius: 4px 4px 0 0;
`;

const Button = styled.span`
  width: 10px;
  height: 10px;
  border: 1px solid black;
  margin: 0 0 0 6px;
  border-radius: 50%;
`;

const CloseButton = styled(Button)`
  border-color: #9d252b;
  background-color: #ff3b47;
`;

const MinButton = styled(Button)`
  border-color: #9d802c;
  background-color: #ffc100;
`;

const MaxButton = styled(Button)`
  border-color: #049931;
  background-color: #00d742;
`;

const CommandLine = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 30px 4px 30px 8px;
  border-radius: 0 0 4px 4px;
  color: white;
  font-family: monospace;
  word-break: break-all;
`;

const TerminalEmulator: FC<TerminalEmulatorProps> = ({ commands, keyFrequencyMs }) => {
  const [isTyping, setIsTyping] = useState(true);
  const [activeCommands, setActiveCommands] = useState<Array<TerminalCommand>>([]);
  const { current: remainingCommands } = useRef<Array<TerminalCommand>>(commands || []);

  const onCommandCompleted = useCallback(() => {
    if (remainingCommands.length) {
      const currentLine = remainingCommands.shift();
      currentLine && setActiveCommands(prev => [...prev, currentLine]);
    } else {
      setIsTyping(false);
    }
  }, [remainingCommands]);

  // called on first render to load the initial active line
  useEffect(() => onCommandCompleted(), []);

  return (
    <Container>
      <ControlBar>
        <CloseButton />
        <MinButton />
        <MaxButton />
      </ControlBar>
      <CommandLine>
        {activeCommands.map((command, index) => (
          <CommandRenderer
            key={`command-${index}`}
            index={index}
            command={command}
            keyFrequencyMs={keyFrequencyMs}
            onCommandCompleted={onCommandCompleted}
            isLastCommand={remainingCommands.length <= 0}
          />
        ))}
        <Cursor isNewLine hidden={isTyping}>
          <br />
          <span>{'$ >'}</span>
          <Cursor blinking>{'_'}</Cursor>
        </Cursor>
      </CommandLine>
    </Container>
  );
};

TerminalEmulator.defaultProps = {
  // commands: [],
  keyFrequencyMs: 40,
};

export default TerminalEmulator;
