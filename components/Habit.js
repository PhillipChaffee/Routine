import React from 'react';
import { StyleSheet } from 'react-native';
import { MonoText } from './StyledText';

export default class Habit extends React.Component {
    render() {
        return (
            <MonoText style={styles.habitText}>
                {this.props.habit}
            </MonoText>
        );
    }
}

const styles = StyleSheet.create({
    habitText: {
        textAlign: 'center',
        fontSize: 16,
        overflow: 'hidden',
        margin: 10,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff'
    }
});