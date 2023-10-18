// RemoteContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CommandRequest, CommandResponse } from 'shared';
import axios from 'axios';

interface RemoteContextProps {
  tvName: string;
  loading: boolean;
  connected: boolean;
  setTvName: (value: string) => void;
  setLoading: (value: boolean) => void;
  setConnected: (value: boolean) => void;
  sendCommand: (commandRequest: CommandRequest) => Promise<CommandResponse>;
}

const RemoteContext = createContext<Partial<RemoteContextProps>>({});

export const useRemote = () => {
  const context = useContext(RemoteContext);
  if (!context) {
    throw new Error('useRemote must be used within a RemoteProvider');
  }
  return context as RemoteContextProps;
};

export const RemoteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tvName, setTvName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [connected, setConnected] = useState<boolean>(false);

  const sendCommand = async (
    commandRequest: CommandRequest
  ): Promise<CommandResponse> => {
    try {
      const response = await axios.post<CommandResponse>(
        'http://localhost:3555/api/v1/command',
        commandRequest
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <RemoteContext.Provider
      value={{
        tvName,
        loading,
        connected,
        setTvName,
        setLoading,
        setConnected,
        sendCommand,
      }}
    >
      {children}
    </RemoteContext.Provider>
  );
};
