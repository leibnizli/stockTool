

'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  PixelRatio,
  NavigatorIOS
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    height: 65,
    backgroundColor: '#2d2c32',
    paddingTop: 30,
    alignItems: 'center'
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

var earningTab = React.createClass({
  render: function() {
    return (
      <View style={ styles.container }>
        <View style={ styles.header }>
          <Text style={ styles.headerText }>财报</Text>
        </View>
        <View style={ styles.content }>
          <Text>
          </Text>
        </View>
      </View>
    );
  }
});

module.exports = earningTab;