import React from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';

import { CountDown } from '../../components/CountDown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';
const DEFAULT_TIME = 1;
export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = React.useState(false);
  const [progress, setProgress] = React.useState(1);
  const [minutes, setMinutes] = React.useState(DEFAULT_TIME);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS == 'ios') {
      const vibrationInterval = setInterval(() => {
        Vibration.vibrate(), 1000;
      });

      setTimeout(() => clearInterval(vibrationInterval), 10000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const handleEnd = async () => {
    vibrate();
    setTimeout(() => {
      setMinutes(DEFAULT_TIME);
      setProgress(1);
      setIsStarted(false);
      onTimerEnd();
    }, 10000);
  };
  const changeTimeHandler = (time) => {
    setMinutes(time);
    setProgress(1);
    setIsStarted(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={handleEnd}
        />
      </View>
      <View style={{ padding: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color="#542b0d"
          style={{ height: 10 }}
        />
      </View>
      <View>
        <Timing onChangeTime={changeTimeHandler} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubject}> 
          <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  clearSubject: {
    paddingBottom: 25,
    paddingLeft:25
  }
});
