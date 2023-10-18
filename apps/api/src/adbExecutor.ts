import { Commands } from 'shared';
import { exec } from 'child_process';
import path from 'path';

const { platform } = process;
const adbPath = path.join(
  __dirname,
  '..',
  'platform-tools',
  platform,
  `adb${platform === 'win32' ? '.exe' : ''}`
);

export const executeCommand = (
  command: Commands,
  ip?: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const baseCommand = `${adbPath} shell input keyevent`;
    let adbCommand: string;

    switch (command) {
      case Commands.CONNECT:
      case Commands.DISCONNECT:
        adbCommand = `${adbPath} ${command} ${ip || ''}`;
        break;
      default:
        adbCommand = `${baseCommand} ${command}`;
    }

    exec(adbCommand, (error) =>
      error ? reject(error) : resolve('Command executed successfully')
    );
  });
};
