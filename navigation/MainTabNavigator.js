import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HabitsScreen from '../screens/HabitsScreen';
import LinksScreen from '../screens/LinksScreen';

const HabitsStack = createStackNavigator({
  Home: HabitsScreen,
});

HabitsStack.navigationOptions = {
  tabBarLabel: 'Habits',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-done-all`
          : 'md-done-all'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Routines',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-clipboard'}
    />
  ),
};

export default createBottomTabNavigator({
  HabitsStack,
  LinksStack
});
