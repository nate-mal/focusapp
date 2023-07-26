import * as React from 'react';

import { Text, View, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';
const minutesToMillis = (min) => min * 1000 * 60;

const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const CountDown = ({
  minutes = 20,
  isPaused = true,
  onProgress,
  onEnd,
}) => {
  const [millis, setMillis] = React.useState(minutesToMillis(minutes));

  const interval = React.useRef(null);
  const countdown = (time) => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };
  React.useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
    if (millis === 0) {
      onEnd();
    }
  }, [millis]);

  React.useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countdown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  React.useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={sytles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const sytles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(46, 20, 5, 0.3)',
    borderRadius: 5,
  },
});
