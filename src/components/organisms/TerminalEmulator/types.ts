export interface TerminalCommand {
  input: string;
  output?: string;
  simulateCommandProcessMs?: number;
}

export interface CommandRendererState {
  isDone: boolean;
  isProcessing: boolean;
}

export interface CommandRendererProps {
  index: number;
  keyFrequencyMs?: number;
  isLastCommand?: boolean;
  command: TerminalCommand;
  onCommandCompleted: () => void;
}

export interface TerminalEmulatorProps {
  keyFrequencyMs?: number;
  commands: Array<TerminalCommand>;
}
