import React, { FC, useCallback, useMemo, useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import CommandRenderer from './CommandRenderer';
import { TerminalCommand, TerminalEmulatorProps } from './types';
import './styles.scss';

const TerminalEmulator: FC<TerminalEmulatorProps> = ({ commands, keyFrequencyMs }) => {
  const [isTyping, setIsTyping] = useState(true);
  const [activeCommands, setActiveCommands] = useState<Array<TerminalCommand>>([]);
  const { current: remainingCommands } = useRef<Array<TerminalCommand>>(commands || []);

  const newLinePromptClasses = useMemo(
    () =>
      classnames(['commandline__prompt-cursor', 'commandline__prompt-cursor--newline'], {
        'commandline__prompt-cursor--hidden': isTyping,
      }),
    [isTyping]
  );

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
    <div className="terminal-emulator">
      <div className="controls">
        <span className="controls__button controls__button--close" />
        <span className="controls__button controls__button--min" />
        <span className="controls__button controls__button--max" />
      </div>
      <div className="commandline">
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
        <p className={newLinePromptClasses}>
          <br />
          <span>{'$ >'}</span>
          <span className="commandline__prompt-cursor-underscore">{'_'}</span>
        </p>
      </div>
    </div>
  );
};

TerminalEmulator.defaultProps = {
  commands: [],
  keyFrequencyMs: 50,
};

export default TerminalEmulator;
