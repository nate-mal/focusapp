import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import {spacing} from '../../utils/sizes'
export const Timing = ({ onChangeTime }) => {
  return (
    <View style={styles.timingContainer}>
      <View style={styles.timingButton}>
        <RoundedButton size={75} title="10" onPress={() => onChangeTime(10)} />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton size={75} title="15" onPress={() => onChangeTime(15)} />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton size={75} title="20" onPress={() => onChangeTime(20)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timingContainer: {
    padding: spacing.md,
    flexDirection: 'row',
  },
  timingButton: {
    flex: 1,
    alignItems: 'center',
  },
});
