/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

/**
* For quota reasons we replaced the Rotten Tomatoes' API with a sample data of
* their very own API that lives in React Native's GitHub repo.
*/

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

var AwesomeProject = React.createClass({
  getInitialState: function() {
      return{
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false,
      };
    },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    };

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow ={this.renderMovie}
        style     ={styles.listView}
      />
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.loadingContainer}>
      <Text>
        Loading movies...
      </Text>
      </View>
    );
  },

  renderMovie: function(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style ={styles.thumbnail}
        />
        <View Style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}> {movie.year}</Text>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  rightContainer: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'left',
  },

  year: {
    textAlign: 'left',
  },

  thumbnail: {
    width: 53,
    height: 81,
  },

  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
