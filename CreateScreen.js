/**
*Name: Lew Wen Khai
*Reg. No.: 1303023
*/

import React, { Component } from 'react';
import {
	StyleSheet,
	TextInput,
	Text,
	TouchableHighlight,
	View,
	ScrollView,
	DatePickerAndroid,
	Button
} from 'react-native';
import {
	InputWithLabel,
	PickerWithLabel,
	AppButton,
} from './UI';

let languageData = require('./LanguageData');
let SQLite = require('react-native-sqlite-storage');

type Props = {};
export default class CreateScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Add A New Movie',
  };

  constructor(props) {
    super(props)

    this.state = {
      title: '',
      language: 1,
      release_date: null,
    };

    this._insert = this._insert.bind(this);

    this.db = SQLite.openDatabase({
        name: 'moviesdb', 
        createFromLocation : '~moviesdb.sqlite'
    }, this.openDb, this.errorDb);
  }

  _insert() {
    this.db.transaction((tx) => {
      tx.executeSql('INSERT INTO movies(title,language,release_date) VALUES(?,?,?)',
	  [
        this.state.title,
        languageData.getValue(languageData.language, this.state.language),
        this.state.release_date.getTime()/1000,
      ]);
    });

    this.props.navigation.getParam('refresh')();
    this.props.navigation.goBack();
  }

  openDatePicker = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: this.state.release_date? this.state.release_date: new Date(),
        minDate: new Date(1970, 0, 1),
        maxDate: new Date(2029, 11, 31),
        mode: 'calendar',
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        let selectDate = new Date(year, month, day);

        this.setState({
          release_date: selectDate,
        });
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <InputWithLabel style={styles.input}
          placeholder={'Enter movie title here'}
          label={'Title'}
          value={this.state.title}
          onChangeText={(title) => {this.setState({title})}}
          orientation={'vertical'}
        />
        <PickerWithLabel style={styles.picker}
          label={'Language'}
          items={languageData.language}
          mode={'dialog'}
          value={this.state.language}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({language: itemValue})
          }}
          orientation={'vertical'}
          textStyle={{fontSize: 28}}
        />
        <View>
            <Text style={styles.label}>
                {'Date of Release'}
            </Text>
            <TouchableHighlight
                underlayColor={'#cccccc'}
                onPress={ this.openDatePicker }
            >
                <View>
                    <TextInput
                    style={styles.input}
                    value={this.state.release_date ? this.state.release_date.toString(): ''}
                    placeholder='Press to choose release date'
                    editable={false}
                    underlineColorAndroid={'transparent'}
                    />
                </View>
            </TouchableHighlight>
        </View> 
        <AppButton style={styles.button}
          title={'Add'}
		  theme={'primary'}
          onPress={this._insert}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 50,
    marginBottom: 10,
  },
  input: {
    fontSize: 28,
    color: '#006652',
    marginTop: -5,
    marginBottom: 10,
  },
  picker: {
    color: '#006652',
	fontSize: 28,
    marginTop: -5,
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
  },
});