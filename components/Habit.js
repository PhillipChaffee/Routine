import React from 'react';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { MonoText } from './StyledText';

export default class Habit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            styles: styles
        };
    }

    render() {

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            <GestureRecognizer
                onSwipe={() => { }}
                onSwipeUp={() => { }}
                onSwipeDown={() => { }}
                onSwipeLeft={(state) => this.onSwipeLeft(state)}
                onSwipeRight={() => { }}
                config={config}>
                <MonoText style={styles.habitText}>
                    {this.props.habit}
                </MonoText>
            </GestureRecognizer>
        );
    }

    onSwipeLeft(gestureState) {
        styles.habitText.backgroundColor = 'red';
        this.setState({ styles: styles });
    }
}

let styles = StyleSheet.create({
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