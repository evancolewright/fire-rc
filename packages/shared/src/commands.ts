export enum Commands {
  UP = 19,
  DOWN = 20,
  LEFT = 21,
  RIGHT = 22,
  SELECT = 66,
  BACK = 4,
  HOME = 3,
  MENU = 82,
  LAST = 21,
  PLAY_TOGGLE = 66,
  NEXT = 22,
  VOLUME_UP = 24,
  VOLUME_DOWN = 25,
  MUTE = 164,
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  TOGGLE_POWER = 26,
}
export type CommandResponse = { success: boolean; error?: string };
export type CommandRequest = { command: Commands; ip?: string };
