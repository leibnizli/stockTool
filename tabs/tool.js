'use strict';
var React = require('react-native');
var query = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22CNYUSD%22%2C%22CNYHKD%22)&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
var {
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicatorIOS,
  Image,
  Component,
  PixelRatio,
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
  },

  money: {

  },
  moneyItem:{
     borderBottomWidth:0.5,
     borderColor:'#eee',
     flexDirection: 'row',
     //alignItems: 'center',
     alignSelf: 'stretch',
     paddingTop:10,
     paddingBottom:10
  },
  moneyType:{
    width:100,
    borderRightWidth:0.5,
    marginRight:5,
    paddingTop:5,
    paddingBottom:5,
    borderColor: '#eee',
    alignItems: 'center'
  },
  moneyName:{
    fontSize:12,
    textAlign: 'center',
    marginTop: 5,
    color:'#666'
  },
  input: {
    flex:1,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 5,
    marginTop:10,
    fontSize: 18,
    color: '#000',
    textAlign:'center'
  },
  rateMain: {
    paddingTop:15,
    paddingLeft:20
  },
  rate: {
    fontSize:12
  },
  flag: {
    width: 60,
    height: 40
  }
});

// ExchangeRate定义类
class ExchangeRate  extends Component {
  //构造函数
  constructor(props) {
    super(props);
    this.state = {
      searchString: '0',
      isLoading:false,
      message:'',
      CNYUSD:0,
      CNYHKD:0,
      date:'...',
      CNY:'',
      USD:'',
      HKD:''
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    this._executeQuery(query);
  }

  _executeQuery(query) {
    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json.query.results.rate))
      .catch(error => 
         this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error
       }));
  }
  _handleResponse(response) {
    this.setState({
      isLoading: false ,
      message: '',
      CNYUSD:response[0].Ask,
      CNYHKD:response[1].Ask,
      date:response[0]["Date"]
    });
  }
  render() {
    var spinner = this.state.isLoading ?
      ( <ActivityIndicatorIOS
          hidden='true'
          size='large'/> ) :
      ( <View/>);
    return(
      <View style={ styles.container }>
        <View style={ styles.header }>
          <Text style={ styles.headerText }>汇率换算</Text>
        </View>
        <View style={ styles.content }>
          <View style={styles.money}>
            <View style={styles.moneyItem}>
              <View style={styles.moneyType}>
                <Image source={require('image!flag1')} style={styles.flag}/>
                <Text style={styles.moneyName}>
                  人民币
                </Text>
              </View>
              <TextInput
                style={styles.input}
                keyboardType='numeric'
                value={this.state.CNY}
                onChangeText={(text) => this.setState({
                  USD: text*this.state.CNYUSD,
                  HKD: text*this.state.CNYHKD
                })}
                placeholder='请输入金额'/>
            </View>
            <View style={styles.moneyItem}>
              <View style={styles.moneyType}>
                <Image source={require('image!flag2')} style={styles.flag}/>
                <Text style={styles.moneyName}>
                  美元
                </Text>
              </View>
              <TextInput
                style={styles.input}
                keyboardType='numeric'
                value={this.state.USD}
                onChangeText={(text) => this.setState({
                  CNY: text/this.state.CNYUSD,
                  HKD: (text/this.state.CNYUSD)*this.state.CNYHKD
                })}
                placeholder='请输入金额'/>
            </View>
            <View style={styles.moneyItem}>
              <View style={styles.moneyType}>
                <Image source={require('image!flag3')} style={styles.flag}/>
                <Text style={styles.moneyName}>
                  港币
                </Text>
              </View>
              <TextInput
                style={styles.input}
                keyboardType='numeric'
                value={this.state.HKD}
                onChangeText={(text) => this.setState({
                  CNY: text/this.state.CNYHKD,
                  USD: (text/this.state.CNYHKD)*this.state.CNYUSD
                })}
                placeholder='请输入金额'/>
            </View>
          </View>
        </View>
        <View>{spinner}</View>
        <View style={styles.rateMain}>
          <Text style={styles.rate}>{'1元＝' + this.state.CNYUSD + '美元，更新于'+ this.state.date}</Text>
          <Text style={styles.rate}>{'1元＝' + this.state.CNYHKD + '港币，更新于'+ this.state.date}</Text>
        </View>
      </View>
    )
  }
}
module.exports = ExchangeRate ;
