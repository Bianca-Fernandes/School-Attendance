import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class AppHeader extends React.Component {
  render() {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.header}>School Attendance</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'black',
  },
  header: {
    color: 'red',
    padding: 20,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Times New Roman',
  },
});
export default AppHeader;
