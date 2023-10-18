import React, { useEffect } from 'react';
import { View, Alert, ActivityIndicator, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

import CircularControls from '../components/CircularControls';
import DPad from '../components/DPad';
import Header from '../components/Header';
import VolumeControls from '../components/VolumeControls';

import { useRemote } from '../RemoteContext';
const RemoteScreen = () => {
  const { setTvName, setConnected, loading, setLoading } = useRemote();

  useEffect(() => {
    const checkTVConnection = async () => {
      try {
        const tvName = (await AsyncStorage.getItem('tvName')) as string;
        setTvName(tvName);
        const tvIp = (await AsyncStorage.getItem('tvIp')) as string;
        if (tvName && tvIp) {
          const response = await axios.get(
            'http://localhost:3555/api/v1/status'
          );
          if (response.data.currentIP === tvIp) {
            setConnected(true);
          } else {
            Alert.alert(
              'Server Busy',
              'The server is currently controlling another TV.'
            );
          }
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          Alert.alert('Server Offline', 'The server is currently offline.');
        } else {
          Alert.alert(
            'Error',
            'An error occurred while checking the TV connection.'
          );
        }
      }
    };

    checkTVConnection();
    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#202124' }}>
      <StatusBar barStyle='light-content' />
      {loading ? (
        <ActivityIndicator
          size='large'
          color='#0000ff'
          style={{ flex: 1, justifyContent: 'center' }}
        />
      ) : (
        <>
          <View>
            <Header />
          </View>

          <View
            style={{
              flex: 3,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 75,
            }}
          >
            <DPad />
          </View>

          <View
            style={{ flex: 2, justifyContent: 'flex-end', paddingBottom: 30 }}
          >
            <CircularControls />
            <VolumeControls />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default RemoteScreen;
