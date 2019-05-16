import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { WebBrowser, Icon } from 'expo';

import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import Habit from '../components/Habit';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Habits',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <FlatList
            data={["Read", "Stretch", "Track Goals"]}
            renderItem={this._renderItem}
          />
        </ScrollView>
        <Icon.Ionicons name='ios-add-circle-outline' size={60} color={'#000'} style={styles.addHabitButton}></Icon.Ionicons>
      </View >
    );
  }

  _renderItem = ({ item }) => (
    <Habit habit={item}></Habit>
  );
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
