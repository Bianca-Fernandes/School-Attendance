import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import db from '../config';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      all_students: [],
      presentPressedList: [],
      absentPressedList: [],
    };
  }

  componentDidMount = async () => {
    var class_ref = await db.ref('/').on('value', (data) => {
      console.log('hello'); //log
      var all_students = [];
      var class_a = data.val();
      for (var i in class_a) {
        all_students.push(class_a[i]);
      }
      console.log('all_students.length');
      all_students.sort(function (a, b) {
        return a.roll_no - b.roll_no;
      });
      this.setState({ all_students: all_students });
    });
  };

  updateAttendence(roll_no, status) {
    var id = '';
    if (roll_no <= 9) {
      id = '0' + roll_no;
    } else {
      id = roll_no;
    }

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
    var ref_path = id;
    // var class_ref = '/' + id + '/' ;
    var class_ref = db.ref(ref_path);
    class_ref.update({
      [today]: status,
    });
    console.log(ref_path);
  }

  goToSummary = () => {
    this.props.navigation.navigate('SummaryScreen');
  };

  render() {
    var all_students = this.state.all_students;
    if (all_students.length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No Student Found</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            {all_students.map((student, index) => (
              <View key={index} style={styles.names}>
                <View
                  key={'name' + index}
                  style={{ flex: 1, flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginRight: 10,
                      marginTop: 15,
                      color: '#CE45FF',
                      marginLeft: 10,
                    }}>
                    {student.roll_no + ' -'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginTop: 15,
                      color: '#5D3EFF',
                    }}>
                    {student.name}
                  </Text>
                </View>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={
                      this.state.presentPressedList.includes(index)
                        ? [styles.presentButton, { backgroundColor: '#00ff04' }]
                        : styles.presentButton
                    }
                    onPress={() => {
                      var presentPressedList = this.state.presentPressedList;
                      presentPressedList.push(index);
                      this.setState({ presentPressedList: presentPressedList });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'present');
                    }}>
                    <Text style={{ fontWeight: 'bold' }}>Present</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={
                      this.state.absentPressedList.includes(index)
                        ? [styles.absentButton, { backgroundColor: 'red' }]
                        : styles.absentButton
                    }
                    onPress={() => {
                      var absentPressedList = this.state.absentPressedList;
                      absentPressedList.push(index);
                      this.setState({ absentPressedList: absentPressedList });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'absent');
                    }}>
                    <Text style={{ fontWeight: 'bold' }}>Absent</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          <View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                this.props.navigation.navigate('SummaryScreen');
              }}>              
              <Text style={styles.submit}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 20,
    borderRadius: 10,
    paddingVertical: 10,
  },
  submit: {
    borderBottomColor: '#CE45FF',
    borderLeftColor: 'red',
    borderRightColor: '#5D3EFF',
    borderTopColor: '#00ff04',
    borderColor: 'lightblue',
    marginTop: 3,
    fontSize: 20,
    color: "red",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  names: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  presentButton: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginLeft: 10,
    marginTop: 15,
  },
  absentButton: {
    width: 70,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginLeft: 10,
    marginTop: 15,
  },
});
