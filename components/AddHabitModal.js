import React from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Text,
    TextInput,
    Button
} from 'react-native';

export default class AddHabitModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = { newHabit: '' };
    }

    render() {
        return (
            <Modal
                transparent={false}
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
                presentationStyle='overFullScreen'
                transparent={true}>
                <View style={styles.modal}>
                    <View style={styles.modalView}>
                        <Text>Habit Name</Text>
                        <TextInput onChangeText={(text) => this.setState({ newHabit: text })}
                            value={this.state.newHabit} style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} />
                        <Button
                            onPress={() => this.closeModal()}
                            title="Cancel"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                        />
                        <Button
                            onPress={() => { this.props.saveHabit(this.state.newHabit); this.closeModal(); }}
                            title="Save"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </View>
            </Modal>
        )
    }

    closeModal() {
        this.props.closeModal();
        this.setState({ newHabit: '' });
    }
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '100%',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center'
    },
    modalView: {
        backgroundColor: '#fff',
        alignSelf: 'center',
        padding: 20,
        width: '80%',
        borderRadius: 10
    }
})