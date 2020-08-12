import React from 'react';
import { StyleSheet, FlatList, Text, View, Dimensions, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, AsyncStorage, StatusBar, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation, NavigationActions } from 'react-navigation';
import { Col, Row, Grid } from "react-native-easy-grid";
import { FontAwesome } from '@expo/vector-icons';
import { Font } from 'expo';
import BottomNavigation from './BottomNavigation';
const axios = require('axios');


class IndiaStatistics extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
      isLoading: true,
      data: [],
    };
  }


  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Gotham-Book': require('../assets/fonts/GothamRoundedBook_21018.ttf'),
      'Gotham-Bold': require('../assets/fonts/GothamBold.ttf'),
      'Gotham-Medium': require('../assets/fonts/GothamMedium.ttf'),
    });

    axios.get('https://api.covid19india.org/data.json')
      .then(response => {
        console.log('india ', response.data.statewise[0]);
        let tmpArray = []
        for (var i = 1; i < response.data.statewise.length; i++) {
          tmpArray.push(response.data.statewise[i])
        }
        console.log('indian states are  ', tmpArray)
        this.setState({
          data: tmpArray,
          fontLoaded: true
        })
      });

  }


  render() {
    viewList = this.state.data.map(function (item, i) {
      return <View style={styles.items} key={i}>

        <Grid>
          <Row size={16} style={styles.rowTop}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{item.lastupdatedtime}</Text>
            </View>
          </Row>

          <Row size={84} style={{ backgroundColor: '#ffffff' }}>
            <Col size={18} style={styles.columnId}>

              <View style={styles.lineNumberView}>
                <Text style={styles.lineNumberText}>{item.statecode}</Text>
              </View>
              <View >
                <Text style={styles.numberId}>{item.active}</Text>
              </View>

            </Col>
            <Col size={50} style={{ backgroundColor: '#ffffff' }}>
              <Grid style={styles.gridContainer2}>
                <Row size={43} style={{ backgroundColor: '#ffffff' }}><Text style={styles.departmentHead}>{item.state}</Text></Row>
                <Row size={19}><Text style={styles.textStyle} >Cases : {item.confirmed}</Text></Row>
                <Row size={19}><Text style={styles.textStyle} >Recovered : {item.recovered}</Text></Row>
                <Row size={19}><Text style={styles.textStyle} >Deaths : {item.deaths}</Text></Row>
              </Grid>
            </Col>

            <Col size={32} style={{ backgroundColor: '#ffffff' }}>
              <View>

              </View>
            </Col>
          </Row>

        </Grid>

      </View>
    })


    if (this.state.fontLoaded) {

      return (
        <View style={styles.container}>

          <View style={styles.topBar}>
            <StatusBar barStyle='light-content' />
          </View>

          <View style={styles.topNav}>
            <Grid>
              <Row>
                <Col style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={styles.Heading} >All India Report</Text>
                </Col>
              </Row>
            </Grid>

          </View>
          <View style={styles.listViewContainer}>
            <ScrollView>
              {viewList}
            </ScrollView>
          </View>


          <View style={styles.footerContainer}>
            <BottomNavigation />
          </View>

        </View>
      );
    }
    else {
      return (
        // <ActivityIndicator size="large" />
        <View style={{ opacity: 1, backgroundColor: '#0047CC', width: wp('100%'), height: hp('100%'), alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../assets/loader.gif')} style={{ width: 50, height: 50 }} />
        </View>
      )

    }

  }
}
export default withNavigation(IndiaStatistics);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#263238',
  },

  topNav: {
    flex: 0.06,
  },

  listViewContainer: {
    flex: 0.86,
    alignItems: 'center',
  },

  footerContainer: {
    flex: 0.08,
  },

  Heading: {
    fontSize: wp('5%'),
    color: '#fff',
    fontFamily: 'Gotham-Book',
    letterSpacing: 1,
    textAlign:'center'
  },

  items: {
    width: wp('96.5%'),
    height: hp('10%'),
    fontSize: wp('5.5%'),
    backgroundColor: '#ffffff',
    marginVertical: hp('0.3%'),
  },

  lineNumberView: {
    width: wp('10.5%'),
    height: wp('10.5%'),
    backgroundColor: '#7986CB',
    marginBottom: hp('0.5%'),
    marginLeft: wp('3%'),
    borderRadius: wp('2.1%'),
    alignItems: 'center',
    justifyContent: 'center'

  },

  lineNumberText: {
    textAlign: 'center',
    fontSize: wp('3.5%'),
    color: '#ffffff',
    fontFamily: 'Gotham-Bold',
  },

  columnId: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  numberId: {
    textAlign: 'center',
    fontSize: wp('3%'),
    fontFamily: 'Gotham-Bold',
    marginLeft: wp('2.4%'),
    marginBottom: hp('1.4%'),
    color: '#3949AB',
  },

  rowTop: {
    justifyContent: 'flex-end',
  },

  dateContainer: {
    width: wp('40%'),
    height: wp('3.5%'),
    justifyContent: 'center',
  },

  dateText: {
    fontSize: wp('2.4%'),
    textAlign: 'right',
    fontFamily: 'Gotham-Medium',
    color: '#3949AB',
    marginRight: wp('1%'),
  },

  gridContainer2: {
    marginLeft: wp('3%'),
  },

  departmentHead: {
    fontSize: wp('3.3%'),
    fontFamily: 'Gotham-Medium',
    color: '#1A237E',
    marginTop: wp('-1.%'),
  },

  textStyle: {
    fontSize: wp('3%'),
    color: '#77869E',
    marginTop: wp('-1%'),
    fontFamily: 'Gotham-Medium',
    letterSpacing: 1,
  },


});





