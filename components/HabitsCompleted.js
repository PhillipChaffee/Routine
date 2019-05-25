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
        return (
            <SwipeListView
                useFlatList
                data={this.props.habits}
                renderItem={this._renderItem}
                renderHiddenItem={(data, rowMap) => (
                    <View style={styles.rowBack}>
                        <Text onPress={() => this.props.removeHabit(data.item)} style={styles.deleteHabit}>❌</Text>
                        <Text onPress={() => this.props.undoCompleted(data.item)} style={styles.completeHabit}>Undo</Text>
                    </View>
                )}
                keyExtractor={this._keyExtractor}
                leftOpenValue={75}
                rightOpenValue={-75}
            />
        );
    }

    _renderItem = ({ item }) => {
        if (new Date(item.lastCompleted).getDate() === new Date().getDate()) {
            return <Habit habit={item.title}></Habit>;
        }
        else {
            return <Text style={{ display: 'none' }}></Text>;
        }
    };

    _keyExtractor = (item) => item.title;
}

const styles = StyleSheet.create({
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
        fontSize: 30,
        padding: 13.9995,
        paddingRight: 40,
        borderRadius: 10
    },
    completeHabit: {
        backgroundColor: '#f1f1f1',
        overflow: 'hidden',
        fontSize: 20,
        padding: 13.9995,
        paddingRight: 5,
        paddingLeft: 40,
        borderRadius: 10
    }
});