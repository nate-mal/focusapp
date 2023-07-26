import * as React from 'react';
import { View, StyleSheet, Platform, AsyncStorage } from 'react-native';
import { spacing } from './utils/sizes';
import { colors } from './utils/colors';
import { Focus } from './features/focus/Focus';
import { FocusHistory } from './features/focus/FocusHistory';
import { Timer } from './features/timer/Timer';

const STATUS = {
  COMPLETE: 1,
  CANCELED: 2,
};
export default function App() {
  const [focusSubject, setFocusSubject] = React.useState();

  const [focusHistory, setFocusHistory] = React.useState([]);

  const addFocusHistoryWithStatus = (subject, status) => {
    setFocusHistory((prev) => [...prev, {key: String(focusHistory.length + 1), subject, status }]);
  };

  const handleTimerEnd = () => {
    addFocusHistoryWithStatus(focusSubject, STATUS.COMPLETE);
    setFocusSubject(null);
  };

  const clearSubjectHandler = () => {
    addFocusHistoryWithStatus(focusSubject, STATUS.CANCELED);
    setFocusSubject(null);
  };

  const clearFocusHistoryHandler = () => {
    setFocusHistory([]);
  };
  const saveFocusHistory = async () => {
    try {
      AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (err) {
      console.log(err);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  React.useEffect(() => {
    loadFocusHistory();
  }, []);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          onTimerEnd={handleTimerEnd}
          focusSubject={focusSubject}
          clearSubject={clearSubjectHandler}
        />
      ) : (
        <View style={{flex:1}}>
          <Focus onAddSubject={setFocusSubject} />
          <FocusHistory
            focusHistory={focusHistory}
            onClear={clearFocusHistoryHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    color: colors.white,
  },
});
