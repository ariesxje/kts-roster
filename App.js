import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';

import { getRosterForWeeks } from './utils/utils';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <CalendarList
            pastScrollRange={10}
            markedDates={getRosterForWeeks(100)}
            markingType={'period'}
            minDate={'2019-12-16'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
