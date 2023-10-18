import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import { useRemote } from '../RemoteContext';
import { Commands } from 'shared';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 12px;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 25px;
  color: white;
`;

const IconContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconSpacer = styled.View`
  width: 12px;
`;

const IconButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const Header: React.FC = () => {
  const { tvName, sendCommand } = useRemote();
  const navigation = useNavigation();

  return (
    <>
      <HeaderContainer>
        <Title>{tvName || 'No Tv Registered'}</Title>
        <IconContainer>
          <TouchableOpacity
            onPress={() => sendCommand({ command: Commands.TOGGLE_POWER })}
          >
            <Ionicons name='md-power' size={30} color='white' />
          </TouchableOpacity>
          <IconSpacer />
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name='md-ellipsis-vertical' size={30} color='white' />
          </TouchableOpacity>
        </IconContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;
