/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var Group = require('./tabs/group');
var Mine = require('./tabs/mine');
var Earning = require('./tabs/earning');
var Tool = require('./tabs/tool');
var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicatorIOS,
  Image,
  Component,
  TabBarIOS,
  StatusBarIOS
} = React;

var styles = StyleSheet.create({
  pageView: {
    backgroundColor: '#fff',
    flex: 1
  }
});


var Grug = React.createClass({
  getInitialState() {
    StatusBarIOS.setStyle(1);
    return {
      selectedTab: 'group'
    }
  },
  changeTab(tabName) {
    this.setState({
      selectedTab: tabName
    });
  },

  render: function() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="小组"
          icon={ require('image!group') }
          onPress={ () => this.changeTab('group') }
          style={styles.test}
          selected={ this.state.selectedTab === 'group' }>
          <Group />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="工具"
          icon={ require('image!tool') }
          onPress={ () => this.changeTab('tool') }
          selected={ this.state.selectedTab === 'tool' }>
          <Tool />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="财报"
          icon={ require('image!earning') }
          onPress={ () => this.changeTab('earning') }
          selected={ this.state.selectedTab === 'earning' }>
          <Earning />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="我的"
          icon={ require('image!mine') }
          onPress={ () => this.changeTab('mine') }
          selected={ this.state.selectedTab === 'mine' }>
          <Mine />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

React.AppRegistry.registerComponent('grug', () => Grug )
