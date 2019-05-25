import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import Habit from './Habit';
import { SwipeListView } from 'react-native-swipe-list-view';

export default class HabitsCompleted extends React.Component {
    render() {
        const completedHabits = this.props.habits.filter(habit => this.completedToday(habit));
        if (!completedHabits || completedHabits.length === 0) {
            return null;
        }

        return (
            <View>
                <Text style={styles.completedHabits}>Completed</Text>
                <SwipeListView
                    useFlatList
                    data={this.props.habits}
                    renderItem={this._renderItem}
                    renderHiddenItem={(data, rowMap) => (
                        <View style={styles.rowBack}>
                            <Text onPress={() => this.props.removeHabit(data.item)} style={styles.deleteHabit}>Delete</Text>
                            <Text onPress={() => this.props.undoCompleted(data.item)} style={styles.undoHabit}>Undo</Text>
                        </View>
                    )}
                    keyExtractor={this._keyExtractor}
                    leftOpenValue={75}
                    rightOpenValue={-75}
                />
            </View>
        );
    }

    _renderItem = ({ item }) => {
        if (this.completedToday(item)) {
            return <Habit habit={item.title}></Habit>;
        }
        else {
            return <Text style={{ display: 'none' }}></Text>;
        }
    };

    _keyExtractor = (item) => item.title;

    completedToday(habit) {
        if (new Date(habit.lastCompleted).getDate() === new Date().getDate()) {
            return true;
        }

        return false;
    }
}

const styles = StyleSheet.create({
    completedHabits: {
        alignSelf: 'center',
        marginVertical: 10,
        fontSize: 16
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15
    },
    deleteHabit: {
        backgroundColor: '#f1f1f1',
        overflow: 'hidden',
        fontSize: 20,
        padding: 13.9995,
        paddingLeft: 5,
        paddingRight: 40,
        borderRadius: 10
    },
    undoHabit: {
        backgroundColor: '#f1f1f1',
        overflow: 'hidden',
        fontSize: 20,
        padding: 13.9995,
        paddingRight: 5,
        paddingLeft: 40,
        borderRadius: 10
    }
});