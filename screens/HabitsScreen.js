import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Modal,
  Text,
  TextInput
} from 'react-native';
import { Icon } from 'expo';
import Habit from '../components/Habit';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super();

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
          <FlatList
            data={this.state.habits}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
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
              <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} />
            </View>
          </View>
        </Modal>
        <Icon.Ionicons name='ios-add-circle-outline' size={60} color={'#000'} style={styles.addHabitButton} onPress={() => this._addHabit()}></Icon.Ionicons>
      </View>
    );
  }

  _renderItem = ({ item }) => (
    <Habit habit={item}></Habit>
  );

  _keyExtractor = (item) => item;

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('HABITS', this.state.habits);
    } catch (error) {
      console.log(error);
    }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('HABITS');
      if (value !== null) {
        this.setState({ habits: value });
      }
    } catch (error) {
      console.log(error);
    }
  }

  _addHabit() {
    this.setState({ modalVisible: true });
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
  }
});
