import React from 'react';
import { StyleSheet, Image, Picker, FlatList, Text, View, Dimensions, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, AsyncStorage, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation, NavigationActions } from 'react-navigation';
import { Col, Row, Grid } from "react-native-easy-grid";
import { FontAwesome, Ionicons, Octicons } from '@expo/vector-icons';
import SvgUri from 'react-native-svg-uri';
const axios = require('axios');


class BottomNavigation extends React.Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
      isLoading: true,
    };
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Gotham-Book': require('../assets/fonts/GothamRoundedBook_21018.ttf'),
      'Gotham-Bold': require('../assets/fonts/GothamBold.ttf'),
      'Gotham-Medium': require('../assets/fonts/GothamMedium.ttf'),
      'FontAwesome': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf'),
      'ionicons': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
      'anticon': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/AntDesign.ttf'),
      'material': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
      'material-community': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
      'octicons': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Octicons.ttf'),

    });
    this.setState({ fontLoaded: true });
    console.log("this.props.navigation.state.routeName", this.props.navigation.state.routeName)
  }


  render() {

    if (this.state.fontLoaded) {

      return (
        <View style={styles.container}>


          <View style={styles.footerContainer}>
            <Row>
              <Col style={styles.footerCol}>
                <TouchableOpacity style={styles.footerCol}>
                  <Ionicons name="ios-home" size={26} color={this.props.navigation.state.routeName == 'HomePage' ? '#0047cc' : '#77869E'} onPress={() => { this.props.navigation.navigate('HomePage') }} />
                  <Text style={styles.textFontFamily}>Home</Text>
                </TouchableOpacity>
              </Col>
              <Col style={styles.footerCol}>
                <TouchableOpacity style={styles.footerCol}>
                  <Octicons name="three-bars" size={26} color={this.props.navigation.state.routeName == 'IndiaStatisticsPage' ? '#0047cc' : '#77869E'} onPress={() => { this.props.navigation.navigate('IndiaStatisticsPage') }} />
                  <Text style={styles.textFontFamily}>India</Text>
                </TouchableOpacity>
              </Col>
              <Col style={styles.footerCol}>
                <TouchableOpacity style={styles.footerCol}>
                  <Ionicons name="ios-analytics" size={26} color={this.props.navigation.state.routeName == 'AllReportsPage' ? '#0047cc' : '#77869E'} onPress={() => { this.props.navigation.navigate('AllReportsPage') }} />
                  <Text style={styles.textFontFamily}>World</Text>
                </TouchableOpacity>
              </Col>
              <Col style={styles.footerCol}>
                <TouchableOpacity style={styles.footerCol}>
                  <Ionicons name="ios-list-box" size={26} color={this.props.navigation.state.routeName == 'IssueListPage' ? '#0047cc' : '#77869E'} onPress={() => { this.props.navigation.navigate('IssueListPage') }} />
                  <Text style={styles.textFontFamily}>Issues</Text>
                </TouchableOpacity>
              </Col>
              <Col style={styles.footerCol}>
                <TouchableOpacity style={styles.footerCol}>
                  <Ionicons name="ios-person" size={26} color={this.props.navigation.state.routeName == 'ProfilePage' ? '#0047cc' : '#77869E'} onPress={() => { this.props.navigation.navigate('ProfilePage') }} />
                  <Text style={styles.textFontFamily}>Profile</Text>
                </TouchableOpacity>
              </Col>
            </Row>
          </View>

        </View>
      );
    }
    else {
      return (
        <View style={{ opacity: 1, backgroundColor: '#0047CC', width: wp('100%'), height: hp('100%'), alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../assets/loader.gif')} style={{ width: 50, height: 50 }} />
        </View>)

    }

  }
}
export default withNavigation(BottomNavigation);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F2F2F2',
  },

  footerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    elevation: 24,
    // borderTopLeftRadius: 45,
    // borderTopRightRadius: 45,
  },

  footerCol: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  textFontFamily: {
    fontSize: wp('2.8%'),
    fontFamily: 'Gotham-Book',
  },
  greatText: {
    fontFamily: 'Gotham-Book'
  },
  searchButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('41.4%'),
    height: hp('6.07%'),
    borderRadius: 8,
    backgroundColor: '#0047CC',
    color: '#fff',
  },
  searchText: {
    color: 'white', fontFamily: 'Gotham-Medium',
  },
  moreIcon: {
    // backgroundColor: '#77869E',
    width: wp("20%"),
    height: wp('20%'),
    borderRadius: wp('20%'),
    borderColor: '#fff',
    borderWidth: 9,
    marginTop: -32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
  },

  // bottomsheet menu css
  menuText: {
    marginLeft: wp('2.5%'), marginTop: hp('2%'), fontFamily: 'Gotham-Book'
  },

  logoProps: {
    marginLeft: wp('4%'),
    alignItems: 'center',
    marginTop: hp('0.2%')
  },

  logoProps1: {
    marginLeft: wp('4.1%'),
    alignItems: 'center',
    marginTop: hp('0.2%')
  },

  logoProps2: {
    marginLeft: wp('4%'),
    alignItems: 'center',
    marginTop: hp('0.2%')
  },

  logoProps3: {
    marginLeft: wp('5%'),
    alignItems: 'center',
    marginTop: hp('0.2%')
  },

  logoProps4: {
    marginLeft: wp('4.3%'),
    alignItems: 'center',
    marginTop: hp('0.2%')
  },
  logoProps5: {
    marginLeft: wp('4.5%'),
    alignItems: 'center',
    marginTop: hp('0.2%')
  },
  logoProps6: {
    marginLeft: wp('3%'),
    alignItems: 'center',
    marginTop: hp('0.1%')
  },
  logoProps7: {
    marginLeft: wp('7%'),
    alignItems: 'center',
    marginTop: hp('0.2%')
  },
  menulogo: {
    marginLeft: wp('90%'), marginTop: hp('-2%')
  },
  menulogo1: { marginTop: hp('2.5%'), marginLeft: wp('20%'), position: 'absolute' },

  homeButton: {
    width: wp('17%'),
    marginLeft: wp('3.5%'),
    height: hp('9%'),


    borderRadius: 12,

    marginTop: hp('4%')

  },

  homeButtonText: {

    textAlign: 'center',

    marginTop: hp('2%'), fontFamily: 'Gotham-Book'

  },

  stationButton: {

    width: wp('17%'),
    marginLeft: hp('4%'),
    height: hp('9%'),
    borderRadius: 12,


    marginTop: hp('4%')
  },

  stationButtonText: {

    textAlign: 'center',
    marginTop: hp('2%'), fontFamily: 'Gotham-Book'

  },
  DisplayButton: {

    width: wp('17%'),

    height: hp('9%'),
    marginLeft: wp('8%'),

    borderRadius: 12,

    marginTop: hp('4%')
  },

  DisplayButtonText: {

    textAlign: 'center',
    marginTop: hp('2%'), fontFamily: 'Gotham-Book'

  },


  shiftsButton: {
    width: wp('17%'),
    marginLeft: hp('2%'),
    height: hp('9%'),


    borderRadius: 12,

    marginTop: hp('4%')

  },


  shiftsButtonText: {

    textAlign: 'center',

    marginTop: hp('2%'), fontFamily: 'Gotham-Book'

  },



  reportButton: {

    width: wp('17%'),
    marginLeft: hp('4%'),
    height: hp('9%'),
    borderRadius: 12,


    marginTop: hp('4%')
  },

  reportButtonText: {

    textAlign: 'center',
    marginTop: hp('2%'), fontFamily: 'Gotham-Book'

  },
  graphButton: {

    width: wp('17%'),

    height: hp('9%'),
    marginLeft: wp('8%'),

    borderRadius: 12,

    marginTop: hp('4%')
  },

  graphButtonText: {

    textAlign: 'center',
    marginTop: hp('2%'), fontFamily: 'Gotham-Book'

  },



  userButton: {
    width: wp('17%'),
    marginLeft: hp('2%'),
    height: hp('9%'),


    borderRadius: 12,

    marginTop: hp('4%')

  },


  userButtonText: {

    textAlign: 'center',

    marginTop: hp('2%'), fontFamily: 'Gotham-Book'

  },


  // others

  moreButton: {

    width: wp('17%'),
    marginLeft: hp('-4.7%'),
    height: hp('9%'),
    borderRadius: 12,


    marginTop: hp('4%')
  },

  moreButtonText: {

    textAlign: 'center',
    marginTop: hp('2%'), fontFamily: 'Gotham-Book'


  },
  //bottomsheet menu css ends here
});





