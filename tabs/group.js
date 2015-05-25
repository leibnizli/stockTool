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
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  listView:{
    backgroundColor:'transparent',
    marginTop: -20,
    paddingLeft:10,
  },
  row: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    paddingLeft:0,
    borderBottomColor:'rgba(0, 0, 0, 0.1)',
    borderBottomWidth:1 / PixelRatio.get()
  },
  textContainer: {
    flex: 1
  },
  cellImage: {
    height: 45,
    borderRadius: 3,
    marginRight: 10,
    width: 45
  },
  time: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 12,
    color: '#cccccc'
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 7
  },
  lastMessage: {
    color: '#999999',
    fontSize: 12
  }
});
var MOCKED_GROUP_DATA = [
  {
    url:"http://localhost/img/jd.jpg",
    name:"京东股票交流",
    time:"10:23",
    contents:"我擦，刚买完就跌了"
  },
  {
    url:"http://localhost/img/xunlei.jpg",
    name:"迅雷股票交流",
    time:"09:10",
    contents:"尼玛，连续跌掉80%"
  },
  {
    url:"http://localhost/img/qq.png",
    name:"腾讯牛股",
    time:"00:23",
    contents:"涨了好多，请大家吃饭"
  },
  {
    url:"http://localhost/img/baidu.png",
    name:"百度股票交流",
    time:"09:10",
    contents:"尼玛，连续跌掉80%"
  },
  {
    url:"http://localhost/img/alibaba.png",
    name:"阿里股票交流",
    time:"10:23",
    contents:"我擦，刚买完就跌了"
  },
  {
    url:"http://localhost/img/qq2.png",
    name:"腾讯牛股",
    time:"00:23",
    contents:"涨了好多，请大家吃饭"
  }
];
var groupTab = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return {
      dataSource: ds.cloneWithRows(MOCKED_GROUP_DATA),
    };
  },
  _renderGroup:function(group){
    return(
      <View style={ styles.row }>
        <Image
          source={ { uri: group.url } }
          style={ styles.cellImage }/>
        <View style={ styles.textContainer }>
          <Text style={ styles.name } numberOfLines={ 1 }>
            { group.name }
          </Text>
          <Text style={ styles.time } numberOfLines={ 1 }>
            { group.time }
          </Text>
          <Text style={ styles.lastMessage } numberOfLines={ 1 }>
            { group.contents }
          </Text>
        </View>
      </View>
     )
  },
  render: function() {
    return (
      <View style={ styles.container }>
        <View style={styles.header}>
          <Text style={ styles.headerText }>小组</Text>
        </View>
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderGroup}
            style={styles.listView} />
      </View>
    );
  }
});

module.exports = groupTab;