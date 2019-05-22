import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Modal,
  Text,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';
import { Icon } from 'expo';
import Habit from '../components/Habit';
import { SwipeListView } from 'react-native-swipe-list-view';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super();

    this._storeData = this._storeData.bind(this);
    this._retrieveData = this._retrieveData.bind(this);
    this._addHabit = this._addHabit.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._saveHabit = this._saveHabit.bind(this);

    this.state = {
      habits: ["Read", "Stretch", "Track Goals"],
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
          <SwipeListView
            useFlatList
            data={this.state.habits}
            renderItem={this._renderItem}
            renderHiddenItem={(data, rowMap) => (
              <View style={styles.rowBack}>
                <Text>Left</Text>
                <Text>Right</Text>
              </View>
            )}
            keyExtractor={this._keyExtractor}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        </ScrollView>
        <Modal
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Habit Name</Text>
              <TextInput onChangeText={(text) => this.setState({ newHabit: text })}
                value={this.state.newHabit} style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} />
              <Button
                onPress={this._closeModal}
                title="Cancel"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />
              <Button
                onPress={() => this._saveHabit(this.state.newHabit)}
                title="Save"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>
        </Modal>
        <Icon.Ionicons name='ios-add-circle-outline' size={60} color={'#000'} style={styles.addHabitButton} onPress={() => this._addHabit()}></Icon.Ionicons>
      </View>
    );
  }

  componentDidMount() {
    this._retrieveData();
  }

  _renderItem = ({ item }) => (
    <Habit habit={item}></Habit>
  );

  _keyExtractor = (item) => item;

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
      }
    } catch (error) {
      console.log(error);
    }
  }

  _addHabit() {
    this.setState({ modalVisible: true });
  }

  _saveHabit(habit) {
    let updatedHabits = this.state.habits.slice();
    updatedHabits.push(habit.trim());

    this.setState({ habits: updatedHabits }, () => {
      this._storeData();
    });

    this._closeModal();
  }

  _removeHabit(habit) {
    let habits = this.state.habits.slice();
    var index = habits.indexOf(habit);
    if (index > -1) {
      habits.splice(index, 1);
      this.setState({ habits: habits }, () => {
        this._storeData();
      });
    }
  }

  _closeModal() {
    this.setState({ modalVisible: false, newHabit: '' });
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
  addHabitButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 10
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15
  }
});
