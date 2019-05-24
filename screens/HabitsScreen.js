import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  AsyncStorage
} from 'react-native';
import { Icon } from 'expo';
import AddHabitModal from '../components/AddHabitModal';
import HabitsTodo from '../components/HabitsTodo';
import HabitsCompleted from '../components/HabitsCompleted';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super();

    this._storeData = this._storeData.bind(this);
    this._retrieveData = this._retrieveData.bind(this);
    this._addHabit = this._addHabit.bind(this);
    this._removeHabit = this._removeHabit.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._saveHabit = this._saveHabit.bind(this);
    this._completeHabit = this._completeHabit.bind(this);
    this.saveHabits = this.saveHabits.bind(this);

    this.state = {
      habits: [],
      modalVisible: false
    };
  }

  static navigationOptions = {
    title: 'Habits',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <HabitsTodo habits={this.state.habits} removeHabit={this._removeHabit} completeHabit={this._completeHabit}></HabitsTodo>
          <Text style={styles.completedHabits}>Completed</Text>
          <HabitsCompleted habits={this.state.habits}></HabitsCompleted>
        </ScrollView>
        <AddHabitModal modalVisible={this.state.modalVisible} saveHabit={this._saveHabit} closeModal={this._closeModal}></AddHabitModal>
        <Icon.Ionicons name='ios-add-circle-outline' size={60} color={'#000'} style={styles.addHabitButton} onPress={() => this._addHabit()}></Icon.Ionicons>
      </View>
    );
  }

  componentDidMount() {
    this._retrieveData();
  }

  _storeData = async () => {
    try {
      var data = JSON.stringify(this.state.habits);
      await AsyncStorage.setItem('HABITS', data);
      console.log("Habit saved.")
    } catch (error) {
      console.log(error);
    }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('HABITS');
      if (value !== null) {
        this.setState({ habits: JSON.parse(value) });
        console.log(JSON.parse(value))
      }
    } catch (error) {
      console.log(error);
    }
  }

  _addHabit() {
    this.setState({ modalVisible: true });
  }

  _saveHabit(title) {
    if (!title)
      return;
    let today = new Date();
    let habit = { title: title.trim(), lastCompleted: today.setDate(today.getDate() - 1) }
    let updatedHabits = this.state.habits.slice();
    updatedHabits.push(habit);

    this.saveHabits(updatedHabits);

    this._closeModal();
  }

  saveHabits(habits) {
    this.setState({ habits: habits }, () => {
      this._storeData();
    });
  }

  _removeHabit(habit) {
    let habits = this.state.habits.slice();
    var index = habits.indexOf(habit);
    if (index > -1) {
      habits.splice(index, 1);
      this.saveHabits(habits);
    }
  }

  _completeHabit(habit) {
    let habits = this.state.habits.slice();
    var index = habits.indexOf(habit);
    if (index > -1) {
      console.log(habits[index])
      habits[index].lastCompleted = new Date();
      this.saveHabits(habits);
    }
  }

  _closeModal() {
    this.setState({ modalVisible: false });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1'
  },
  contentContainer: {
    margin: 20
  },
  completedHabits: {
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: 16
  },
  addHabitButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 10
  }
});
