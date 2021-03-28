import React, {
  FC,
  memo,
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from 'react';
import styled from 'styled-components';
import Cursor from '../../atoms/Cursor';
import CommandRenderer from './CommandRenderer';
import { TerminalCommand, TerminalEmulatorProps, TerminalEmulatorState } from './types';

const Container = styled.div`
  width: 100%;
  min-height: 200px;
  background-color: rgb(39, 39, 39, 0.7);
  border-radius: 4px;
  font-size: 14px;
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

const TerminalEmulator: FC<TerminalEmulatorProps> = memo(
  ({ commands, keyFrequencyMs, replayFrequencyMs }) => {
    const [{ activeCommands, isTyping }, setState] = useState<TerminalEmulatorState>({
      isTyping: true,
      activeCommands: [],
    });
    const remainingCommandsRef = useRef<Array<TerminalCommand>>([...commands] || []);

    const animationTimerRef = useRef<any>();

    const onCommandCompleted = useCallback(() => {
      if (remainingCommandsRef.current.length) {
        const currentLine = remainingCommandsRef.current.shift();
        currentLine &&
          setState(prev => ({
            ...prev,
            activeCommands: [...prev.activeCommands, currentLine],
          }));
      } else {
        setState(prev => ({ ...prev, isTyping: false }));
      }
    }, [remainingCommandsRef]);

    // called on first render to load the initial active line
    useEffect(() => {
      onCommandCompleted();
    }, []);

    useLayoutEffect(() => {
      if (!isTyping && !animationTimerRef.current) {
        animationTimerRef.current = setTimeout(() => {
          animationTimerRef.current = null;
          remainingCommandsRef.current = [...commands];
          setState({ activeCommands: [], isTyping: true });
          onCommandCompleted();
        }, replayFrequencyMs);
      }

      return () => clearTimeout(animationTimerRef.current);
    }, [isTyping, remainingCommandsRef, onCommandCompleted, animationTimerRef]);

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
              isLastCommand={remainingCommandsRef.current.length <= 0}
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
  },
  () => true
);

TerminalEmulator.defaultProps = {
  keyFrequencyMs: 40,
  replayFrequencyMs: 8000,
};

export default TerminalEmulator;
