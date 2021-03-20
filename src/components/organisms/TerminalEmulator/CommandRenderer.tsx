import React, { FC, useCallback, useState, useEffect, useMemo } from 'react';
import Typist from 'react-typist';
import { uniqueId } from 'lodash';
import styled from 'styled-components';
import Cursor from '../../atoms/Cursor';
import Optional from '../../atoms/Optional';
import { CommandRendererProps, CommandRendererState } from './types';
import './styles.scss';

const Prompt = styled.p`
  color: ${({ theme }) => theme.colors.theme.success};
`;

const CommandRenderer: FC<CommandRendererProps> = ({
  index,
  isLastCommand,
  keyFrequencyMs,
  onCommandCompleted,
  command: { input = '', output = '', simulateCommandProcessMs = 0 },
}) => {
  const [{ isDone, isProcessing }, setState] = useState<CommandRendererState>({
    isDone: false,
    isProcessing: false,
  });

  const promptInputId = useMemo(() => uniqueId('prompt-input'), []);

  const onTypingDone = useCallback(() => {
    setState({ isDone: false, isProcessing: true });
    setTimeout(
      () => {
        setState({ isDone: true, isProcessing: false });
        onCommandCompleted();
      },
      output ? simulateCommandProcessMs : 0
    );
  }, [output, simulateCommandProcessMs]);

  useEffect(() => {
    // Hacky fix to get around a bug with react-typist.
    // Classes do not update using state nor refs.
    const noInputCursorClass = 'terminal-prompt__input--no-cursor';
    const promptInputClasses = document.getElementById(promptInputId)?.classList;

    isDone || isProcessing || isLastCommand
      ? promptInputClasses?.add(noInputCursorClass)
      : promptInputClasses?.remove(noInputCursorClass);
  }, [isProcessing, isLastCommand, promptInputId, isDone]);

  return (
    <div key={`commandline-${index}`} className="terminal-prompt">
      <Typist
        avgTypingDelay={keyFrequencyMs}
        onTypingDone={onTypingDone}
        cursor={{ show: false }}>
        <Prompt>
          <Cursor>$&nbsp;</Cursor>
          <span id={promptInputId} className="terminal-prompt__input">
            {input}
          </span>
        </Prompt>
      </Typist>
      <Optional renderIf={isDone}>
        <p>{output}</p>
        <br />
      </Optional>
      <Optional renderIf={isProcessing}>
        <Cursor blinking>{'_'}</Cursor>
      </Optional>
    </div>
  );
};

CommandRenderer.defaultProps = {
  keyFrequencyMs: 50,
  isLastCommand: false,
  onCommandCompleted: () => {},
};

export default CommandRenderer;
