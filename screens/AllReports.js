import React from 'react';
import { StyleSheet, FlatList, Text, View, Icon, Dimensions, TouchableOpacity, ScrollView, AsyncStorage, Image, StatusBar, fixed, border, ActivityIndicator } from 'react-native';
import { withNavigation, NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Col, Row, Grid } from "react-native-easy-grid";
import BottomNavigation from '../screens/BottomNavigation';
const axios = require('axios');
import Moment from 'moment';

class AllReports extends React.Component {

  constructor() {
    super();
    this.state = {
      fontLoaded: false,
      isLoading: true,
      data: [],
      globalData: [],
      countryFlags: [],
    };
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Gotham-Book': require('../assets/fonts/GothamRoundedBook_21018.ttf'),
      'Gotham-Bold': require('../assets/fonts/GothamBold.ttf'),
      'Gotham-Medium': require('../assets/fonts/GothamMedium.ttf'),
      'FontAwesome': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf'),
      'ionicons': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
      'octicons': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Octicons.ttf'),
      'material': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')
    });

    // this.setState({ fontLoaded: true });
    axios.get('https://api.covid19api.com/summary')
      .then(response => {
        console.log('look here below ', response.data.Countries[0]);
        console.log('global response ', response.data.Global);
        let tmpArray = []
        for (var i = 0; i < response.data.Countries.length; i++) {
          tmpArray.push(response.data.Countries[i])
        }
        console.log('reponse is ', tmpArray)
        this.setState({
          data: tmpArray,
          globalData: response.data.Global,
          fontLoaded: true
        })
      });
  }

  render() {
    Moment.locale('en');  // for date-time format
   
    viewList = this.state.data.map(function (item, i) {
      return <View style={styles.items} key={i}>
        <Grid>
          <Row size={26} >
            <Col size={70}><Text style={styles.countryName}>{item.Country}</Text></Col>
            <Col size={30}><Text style={{ alignItems: 'center', justifyContent: 'center', fontFamily: 'Gotham-Bold', fontSize: wp('2.5%'), color: '#3949AB', marginTop: hp('0.5%'), marginRight: hp('-0.6%'), }}>{Moment(item.Date).format('YYYY-MM-DD  HH:mm:ss')}</Text></Col>
          </Row>
          <Row size={10}></Row>
          <Row size={28}>
            <Col style={{ alignItems: 'center', textAlign: 'center', justifyContent: 'center', flexDirection: 'row' }}><Text style={{ color: '#7986CB', fontFamily: 'Gotham-Medium', marginLeft: wp('2%'), fontSize: wp('3.2%') }}>Cases</Text></Col>
            <Col style={{ alignItems: 'center', textAlign: 'center', justifyContent: 'center', flexDirection: 'row' }}><Text style={{ color: '#7986CB', fontFamily: 'Gotham-Medium', marginLeft: wp('2%'), fontSize: wp('3.2%') }}>Cured</Text></Col>
            <Col style={{ alignItems: 'center', textAlign: 'center', justifyContent: 'center', flexDirection: 'row' }}><Text style={{ color: '#7986CB', fontFamily: 'Gotham-Medium', marginLeft: wp('2%'), fontSize: wp('3.2%') }}>Deaths</Text></Col>
          </Row>
          <Row size={36}>
            <Col style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }} ><Text style={{ color: '#263238', fontFamily: 'Gotham-Medium', fontSize: wp('3.5%') }}>{item.TotalConfirmed}</Text></Col>
            <Col style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }} ><Text style={{ color: '#263238', fontFamily: 'Gotham-Medium', fontSize: wp('3.5%') }}>{item.TotalRecovered}</Text></Col>
            <Col style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }} ><Text style={{ color: '#263238', fontFamily: 'Gotham-Medium', fontSize: wp('3.5%') }}>{item.TotalDeaths}</Text></Col>
          </Row>
        </Grid>
      </View>

    })

    if (this.state.fontLoaded) {
      return (

        <View style={styles.container}>
          <View style={styles.navigationTop}>
            <Text style={styles.head}>Covid-19 World Report</Text>
          </View>
          <View style={styles.listViewContainer}>
            <ScrollView>
              {viewList}
            </ScrollView>
          </View>
          <View style={styles.view7}>
            <BottomNavigation />
          </View>
        </View>
      );
    }
    else {
      return (
        // <ActivityIndicator size="large" color="#0000ff" style={styles.horizontal} />
        <View style={{ opacity: 1, backgroundColor: '#0047CC', width: wp('100%'), height: hp('100%'), alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../assets/loader.gif')} style={{ width: 50, height: 50 }} />
        </View>
      )
    }
  }
}
export default withNavigation(AllReports);

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#263238',
  },

  navigationTop: {
    flex: 0.06,
    backgroundColor: '#263238',

  },

  head: {
    textAlign: 'center',
    color: '#fff',
    fontSize: wp('4.8%'),
    fontFamily: 'Gotham-Medium',
    marginTop: hp('1%'),
    letterSpacing: 1,
  },

  listViewContainer: {
    flex: 0.86,
    alignItems: 'center',
    paddingTop: hp('0.3%')
  },

  view7: {
    flex: 0.08,
  },

  items: {
    width: wp('96.5%'),
    height: hp('9.8%'),
    fontSize: wp('5.5%'),
    backgroundColor: '#FAFAFA',
    marginBottom: wp('1%'),
    borderColor: '#fff',

  },

  countryName: {
    fontSize: wp('4%'),
    textAlign: 'left',
    fontFamily: 'Gotham-Medium',
    justifyContent: "center",
    color: '#1A237E',
    marginLeft: wp('2.2%'),
    marginTop: hp('0.5%'),
  },
});


