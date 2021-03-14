import React, { FC, useCallback, useState, useEffect } from 'react';
import Typist from 'react-typist';
import Optional from '../../atoms/Optional';
import { CommandRendererProps, CommandRendererState } from './types';
import './styles.scss';

const CommandRenderer: FC<CommandRendererProps> = ({
  index,
  keyFrequencyMs,
  isLastCommand,
  onCommandCompleted,
  command: { input = '', output = '', simulateCommandProcessMs = 0 },
}) => {
  const [{ isDone, isProcessing }, setState] = useState<CommandRendererState>({
    isDone: false,
    isProcessing: false,
  });

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
    const noInputCursorClass = 'commandline__prompt-input--no-cursor';
    const promptInputClasses = document.getElementById('prompt-input')?.classList;

    isProcessing || isLastCommand
      ? promptInputClasses?.add(noInputCursorClass)
      : promptInputClasses?.remove(noInputCursorClass);
  }, [isProcessing, isLastCommand]);

  return (
    <div className="commandline__prompts" key={`commandline-${index}`}>
      <Typist
        avgTypingDelay={keyFrequencyMs}
        onTypingDone={onTypingDone}
        cursor={{ show: false }}>
        <p className="commandline__prompt">
          <span className="commandline__prompt-cursor">$&nbsp;</span>
          <span id="prompt-input" className="'commandline__prompt-input">
            {input}
          </span>
        </p>
      </Typist>
      <Optional renderIf={isDone}>
        <p className="commandline__prompt-output">{output}</p>
        <br />
      </Optional>
      <Optional renderIf={isProcessing}>
        <span className="commandline__prompt-cursor-underscore">{'_'}</span>
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
