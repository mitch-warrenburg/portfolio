import React, { FC, useCallback, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Cursor from '../../atoms/Cursor';
import CommandRenderer from './CommandRenderer';
import { TerminalCommand, TerminalEmulatorProps } from './types';

const Container = styled.div`
  font-size: 1rem;
  min-height: 200px;
  background-color: rgb(39, 39, 39, 0.7);
  border-radius: 4px;
  width: 100%;
`;

const ControlBar = styled.div`
  width: 100%;
  height: 24px;
  background-color: #bbbbbb;
  border-radius: 4px 4px 0 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Button = styled.span`
  margin: 0 0 0 6px;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  border: 1px solid black;
`;

const CloseButton = styled(Button)`
  border-color: #9d252b;
  background-color: #ff3b47;
`;

const MinButton = styled(Button)`
  background-color: #ffc100;
  border-color: #9d802c;
`;

const MaxButton = styled(Button)`
  background-color: #00d742;
  border-color: #049931;
`;

const CommandLine = styled.div`
  height: 100%;
  color: white;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 30px 4px 30px 8px;
  border-radius: 0 0 4px 4px;
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
