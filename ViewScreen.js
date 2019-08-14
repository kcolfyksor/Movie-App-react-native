/**
*Name: Lew Wen Khai
*Reg. No.: 1303023
*/

import React, { Component } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {
  InputWithLabel
} from './UI';

Date.prototype.formatted = function() {
  let day = this.getDay();
  let date = this.getDate();
  let month = this.getMonth();
  let year = this.getFullYear();
  let daysText = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  let monthsText = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];

  return `${daysText[day]}, ${monthsText[month]} ${date}, ${year}`;
}

let SQLite = require('react-native-sqlite-storage');

type Props = {};
export default class ViewScreen extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('headerTitle')
    };
  };

  constructor(props) {
    super(props)

    this.state = {
      movieId: this.props.navigation.getParam('id'),
      movie: null,
    };

    this._query = this._query.bind(this);

    this.db = SQLite.openDatabase({
		name: 'moviesdb',
		createFromLocation : '~moviesdb.sqlite'},
		this.openDb, this.errorDb);
  }

  componentDidMount() {
    this._query();
  }

  _query() {
    this.db.transaction((tx) => {
      tx.executeSql('SELECT * FROM movies WHERE id = ?', [this.state.movieId], (tx, results) => {
        if(results.rows.length) {
          this.setState({
            movie: results.rows.item(0),
          })
        }
      })
    });
  }

  openDb() {
      console.log('Database opened');
  }

  errorDb(err) {
      console.log('SQL Error: ' + err);
  }

  render() {
    let movie = this.state.movie;

    return (
      <View style={styles.container}>
        <ScrollView>
          <InputWithLabel style={styles.output}
            label={'Title'}
            value={movie ? movie.title : ''}
            orientation={'vertical'}
			multiline={true}
            editable={false}
          />
          <InputWithLabel style={styles.output}
            label={'Language'}
            value={movie ? movie.language : ''}
            orientation={'vertical'}
			multiline={true}
            editable={false}
          />
          <InputWithLabel style={styles.output}
            label={'Date of Release'}
            value={movie ? new Date(movie.release_date*1000).formatted() : ''}
            orientation={'vertical'}
			multiline={true}
            editable={false}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: '#fff',
  },
  output: {
    fontSize: 28,
    color: '#006652',
    marginTop: -5,
    marginBottom: 20,
  },
});