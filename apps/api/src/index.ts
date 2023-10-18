import cors from 'cors';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { Commands, CommandRequest } from 'shared';
import { isValidCommand } from './utils';
import { executeCommand } from './adbExecutor';

const app = express();

interface ADBSettings {
  connected: boolean;
  deviceIP?: string;
}

let adbSettings: ADBSettings = {
  connected: false,
  deviceIP: '',
};

app.use(express.json());
app.use(morgan('short'));
app.use(cors({ origin: ['*'] }));

app.get('/api/v1/status', (req: Request, res: Response) =>
  res.send(adbSettings)
);

app.post('/api/v1/command', async (req: Request, res: Response) => {
  const commandReq: CommandRequest = req.body;

  if (!isValidCommand(commandReq))
    return res.status(400).send({ error: 'Invalid command' });
  if (commandReq.command === Commands.CONNECT && adbSettings.connected)
    return res
      .status(200)
      .send({ success: false, error: 'ADB is already connected to a TV.' });

  try {
    await executeCommand(commandReq.command, commandReq.ip);

    if (commandReq.command === Commands.CONNECT)
      adbSettings = { connected: true, deviceIP: commandReq.ip };
    else if (commandReq.command === Commands.DISCONNECT)
      adbSettings = { connected: false, deviceIP: '' };

    return res.status(200).send({ success: true });
  } catch (error: any) {
    return res
      .status(500)
      .send({ error: `Failed to execute command: ${error.message}` });
  }
});

app.listen(3555);
