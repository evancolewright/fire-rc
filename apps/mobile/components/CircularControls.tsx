import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import { useRemote } from '../RemoteContext';
import { Commands } from 'shared';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 12px;
  justify-content: space-between;
`;

const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: #3c4043;
  height: 70px;
  width: 70px;
  border-radius: 35px;
`;

const CenterButton = styled(Button)`
  height: 87px;
  width: 87px;
  border-radius: 43.5px;
  padding: 13px;
`;

const CircularControls: React.FC = () => {
  const { sendCommand } = useRemote();
  return (
    <Container>
      <Button onPress={() => sendCommand({ command: Commands.BACK })}>
        <Ionicons name='md-arrow-back' size={26} color='white' />
      </Button>
      <CenterButton onPress={() => sendCommand({ command: Commands.HOME })}>
        <Ionicons name='md-home' size={26} color='white' />
      </CenterButton>
      <Button onPress={() => sendCommand({ command: Commands.MENU })}>
        <Ionicons name='md-menu' size={26} color='white' />
      </Button>
    </Container>
  );
};

export default CircularControls;
