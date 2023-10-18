import { Commands, CommandRequest } from 'shared';

export const isValidCommand = (cmd: CommandRequest): boolean => {
  if (cmd.command === Commands.CONNECT) return Boolean(cmd.ip);
  return Object.values(Commands).includes(cmd.command);
};
