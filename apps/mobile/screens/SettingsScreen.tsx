import React, { useState } from 'react';
import { Text, TextInput, Button, Alert } from 'react-native';
import { useRemote } from '../RemoteContext';
import { CommandResponse, Commands } from 'shared';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsScreen: React.FC = () => {
  const { tvName, setTvName, connected, setConnected, sendCommand } =
    useRemote();
  const [newTvName, setNewTvName] = useState(tvName || '');
  const [newTvIp, setNewTvIp] = useState('');

  const handleConnect = async () => {
    try {
      const response: CommandResponse = await sendCommand({
        command: Commands.TOGGLE_POWER,
        ip: newTvIp,
      });
      if (response.success)
        Alert.alert(
          'Connected',
          `You are now connected to ${newTvName} with an ip of ${newTvIp}. `
        );
      setTvName(newTvName);
      setConnected(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the TV.' + error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await sendCommand({ command: Commands.DISCONNECT });
      Alert.alert('Disconnected', 'Disconnected from server.');
      setConnected(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to disconnect from the TV.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text>TV Name:</Text>
      <TextInput
        placeholder='Enter TV Name'
        value={newTvName}
        onChangeText={(text) => setNewTvName(text)}
      />
      <Text>TV IP Address:</Text>
      <TextInput
        placeholder='Enter TV IP Address'
        value={newTvIp}
        onChangeText={(text) => setNewTvIp(text)}
      />
      {connected ? (
        <Button
          title='Disconnect'
          onPress={handleDisconnect}
          disabled={!connected}
        />
      ) : (
        <Button title='Connect' onPress={handleConnect} disabled={connected} />
      )}
    </SafeAreaView>
  );
};

export default SettingsScreen;
