import * as React from 'react';

import { Text, View, StyleSheet } from 'react-native';

import { TextInput } from 'react-native-paper';

import { RoundedButton } from '../../components/RoundedButton';

import {fontSizes, spacing} from '../../utils/sizes';
import {colors} from '../../utils/colors';
export const Focus = (props) => {
  const [subject, setSubject] = React.useState(null);
  const handleAddSubject = () => {
    props.onAddSubject(subject);
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus on?	🤨</Text>
        <View style={styles.inputContainer}>
          <TextInput
            onSubmitEditing={({ nativeEvent }) => {
              setSubject(nativeEvent.text);
            }}
            style={{ flex: 1 }}
            underlineColor={colors.secondary}
            theme={{ colors: { primary: colors.secondary} }}
          />
          <RoundedButton
            onPress={handleAddSubject}
            style={{ marginLeft: spacing.md }}
            title="+"
            size={50}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex:1,
    padding: spacing.md,
  },
  title: {
    color: '#fff',
    fontSize: fontSizes.md,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    paddingTop: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
