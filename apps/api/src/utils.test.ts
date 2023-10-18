import { Commands, CommandRequest } from 'shared';
import { isValidCommand } from './utils';

describe('isValidCommand', () => {
  it('should return true for valid command without IP', () => {
    const cmd: CommandRequest = { command: Commands.BACK };
    expect(isValidCommand(cmd)).toBe(true);
  });

  it('should return false for CONNECT command without IP', () => {
    const cmd: CommandRequest = { command: Commands.CONNECT };
    expect(isValidCommand(cmd)).toBe(false);
  });

  it('should return true for CONNECT command with IP', () => {
    const cmd: CommandRequest = {
      command: Commands.CONNECT,
      ip: '192.168.0.1',
    };
    expect(isValidCommand(cmd)).toBe(true);
  });

  it('should return false for invalid command', () => {
    const cmd: CommandRequest = { command: 'INVALID_COMMAND' as Commands };
    expect(isValidCommand(cmd)).toBe(false);
  });
});
