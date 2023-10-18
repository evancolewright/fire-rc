import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { useRemote } from '../RemoteContext';
import { Commands } from 'shared';

const VolumeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 12px;
`;

const MuteButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: #3c4043;
  height: 70px;
  width: 70px;
  border-radius: 35px;
  margin-right: 12px;
`;

const VolumeButton = styled.TouchableOpacity`
  flex: 1;
  height: 70px;
  background-color: #3c4043;
  justify-content: center;
  align-items: center;
`;

const VolumeDown = styled(VolumeButton)`
  border-top-left-radius: 35px;
  border-bottom-left-radius: 35px;
  margin-right: 7px;
`;

const VolumeUp = styled(VolumeButton)`
  border-top-right-radius: 35px;
  border-bottom-right-radius: 35px;
`;

const VolumeControls: React.FC = () => {
  const { sendCommand } = useRemote();
  return (
    <VolumeContainer>
      <MuteButton>
        <Ionicons
          name='md-volume-mute'
          size={28}
          color='white'
          onPress={() => sendCommand({ command: Commands.MUTE })}
        />
      </MuteButton>
      <VolumeDown>
        <Ionicons
          name='md-volume-low'
          size={28}
          color='white'
          onPress={() => sendCommand({ command: Commands.VOLUME_DOWN })}
        />
      </VolumeDown>
      <VolumeUp>
        <Ionicons
          name='md-volume-high'
          size={28}
          color='white'
          onPress={() => sendCommand({ command: Commands.VOLUME_UP })}
        />
      </VolumeUp>
    </VolumeContainer>
  );
};

export default VolumeControls;
