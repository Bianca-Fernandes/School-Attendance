import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import db from '../config';

class SummaryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      present_students: [],
      absent_students: [],
    };
  }

  getTodaysDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;
    return today;
  }

  componentDidMount = async () => {
    var today = await this.getTodaysDate();

    var student_ref = await db.ref('/').on('value', (data) => {
      var class_a = data.val();
      var present_students = [];
      var absent_students = [];
      for (var i in class_a) {
        if (class_a[i][today] === 'present') {
          present_students.push(class_a[i]);
        }
        if (class_a[i][today] === 'absent') {
          absent_students.push(class_a[i]);
        }
      }
      present_students.sort(function (a, b) {
        return a.roll_no - b.roll_no;
      });

      absent_students.sort(function (a, b) {
        return a.roll_no - b.roll_no;
      });
      this.setState({
        present_students: present_students,
        absent_students: absent_students,
      });
    });
  };
  // var ref_path = id;
  // var class_ref = db.ref(ref_path);
  // class_ref.update({
  //   [today]: status,
  // });

  render() {
    return (
      <View>
        <Text style={styles.title}>Present Students List:</Text>

        <View style={styles.presentList}>
          {this.state.present_students.map((student, index) => (
            <Text
              style={{
                fontSize: 15,
                color: '#00ff04',
                // color: '#FFFFFF',
                fontFamily: 'Times New Roman',
              }}>
              {student.name}
            </Text>
          ))}
        </View>

        <Text style={styles.title}>Absent Students List:</Text>
        <View style={styles.absentList}>
          {this.state.absent_students.map((student, index) => (
            <Text
              style={{
                fontSize: 15,
                color: 'red',
                fontFamily: 'Times New Roman',
              }}>
              {student.name}
            </Text>
          ))}
        </View>

        <View
          style={{
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <Text> Total: 18 students </Text>
          <Text>Present: {this.state.present_students.length}</Text>
          <Text>Absent: {this.state.absent_students.length}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 30,
    fontSize: 20,
    fontFamily: 'Times New Roman',
  },
  presentList: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  absentList: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default SummaryScreen;
