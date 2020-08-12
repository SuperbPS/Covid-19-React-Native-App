import React from 'react';
import { StyleSheet, FlatList, Text, View, Dimensions, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, AsyncStorage, StatusBar, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation, NavigationActions } from 'react-navigation';
import { Col, Row, Grid } from "react-native-easy-grid";
import SvgUri from 'react-native-svg-uri';
import BottomNavigation from '../screens/BottomNavigation';
import { FontAwesome, Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';

class ProfileScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false,
      scaleAnimationDialog1: false,

    };
  }
  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Gotham-Book': require('../assets/fonts/GothamRoundedBook_21018.ttf'),
      'Gotham-Bold': require('../assets/fonts/GothamBold.ttf'),
      'Gotham-Medium': require('../assets/fonts/GothamMedium.ttf'),
      'FontAwesome': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf'),
      'ionicons': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
      'material': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
      'anticon': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/AntDesign.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {


    if (this.state.fontLoaded) {
      return (
        <View style={styles.container}>

          <StatusBar barStyle='light-content' />


          <View style={styles.navigationTop}>
            <Grid>
              <Row>
                <Col><Text style={styles.globeHead}>Profile</Text></Col>
              </Row>
            </Grid>
          </View>

          <View style={styles.scrollViewContainer}>
            <ScrollView>
              <Image source={require('../assets/Cover.jpg')} style={{ width: wp('100%'), height: hp('40%'), }} />
              <View style={{ width: wp('38%'), height: hp('22%'), backgroundColor: '#fff', marginLeft: wp('30%'), marginTop: hp('-10%'), borderRadius: wp('50%'), elevation: 6, }}>
                <TouchableOpacity onPress={() => { this.setState({ scaleAnimationDialog1: true, }); }}>
                  <Image source={require('../assets/Profile.jpg')} style={{ borderRadius: wp('50%'), width: wp('38%'), height: hp('22%'), }} />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textD}>Followers</Text>
                <Text style={styles.textD1}>Following</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.textD3}>22K</Text>
                <Text style={styles.textD4}>597</Text>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.name}>Pratibha Sharma</Text>
                <Text style={styles.dev}>Developer</Text>
              </View>

              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={{ width: wp('30%'), height: hp('6%'), backgroundColor: '#263238', borderRadius: wp('5%'), alignItems: 'center', justifyContent: 'center', marginTop: hp('2%') }}><Text style={styles.follow}>Follow</Text></TouchableOpacity>
              </View>

              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: hp('2.5%') }}>
                <TouchableOpacity><AntDesign name="instagram" size={26} color='#E91E63' style={{ marginRight: wp('4.5%') }} /></TouchableOpacity>
                <TouchableOpacity><FontAwesome name="facebook-square" size={26} color='blue' /></TouchableOpacity>
                <TouchableOpacity><AntDesign name="twitter" size={26} color='#1976D2' style={{ marginLeft: wp('4.5%') }} /></TouchableOpacity>
              </View>
              {/* pop up starts */}
              <Dialog onTouchOutside={() => { this.setState({ scaleAnimationDialog1: false }); }}
                width={0.9}
                visible={this.state.scaleAnimationDialog1}
                dialogAnimation={new ScaleAnimation()}
                onHardwareBackPress={() => {
                  console.log('onHardwareBackPress');
                  this.setState({ scaleAnimationDialog1: false });
                  return true;
                }}
                dialogTitle={
                  <DialogTitle
                    title="Profile"
                    hasTitleBar={true}
                  />
                }
                actions={[
                  <DialogButton text="DISMISS" onPress={() => { this.setState({ scaleAnimationDialog1: false }); }} />,
                ]}>
                <DialogContent>
                  <View style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', }}>
                    <Image source={require('../assets/Profile.jpg')} style={{ borderRadius: wp('50%'), width: wp('38%'), height: hp('22%'), marginTop: hp('2%') }} />

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={styles.name}>Pratibha Sharma</Text>
                      <Text style={styles.dev}>Developer</Text>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <TouchableOpacity style={{ width: wp('30%'), height: hp('6%'), backgroundColor: '#263238', borderRadius: wp('5%'), alignItems: 'center', justifyContent: 'center', marginTop: hp('2%') }}><Text style={styles.follow}>Follow</Text></TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: hp('2.5%') }}>
                      <TouchableOpacity><AntDesign name="instagram" size={26} color='#E91E63' style={{ marginRight: wp('4.5%') }} /></TouchableOpacity>
                      <TouchableOpacity><FontAwesome name="facebook-square" size={26} color='blue' /></TouchableOpacity>
                      <TouchableOpacity><AntDesign name="twitter" size={26} color='#1976D2' style={{ marginLeft: wp('4.5%') }} /></TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.closeButton} onPress={() => { this.setState({ scaleAnimationDialog1: false }); }}><Text style={styles.closeText}>Close</Text></TouchableOpacity>
                  </View>
                </DialogContent>
              </Dialog>
              {/* pop up ends */}
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
        <View style={{ opacity: 1, backgroundColor: '#0047CC', width: wp('100%'), height: hp('100%'), alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../assets/loader.gif')} style={{ width: 50, height: 50 }} />
        </View>
      )

    }

  }
}
export default withNavigation(ProfileScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  navigationTop: {
    flex: 0.07,
    elevation: 1,
  },

  scrollViewContainer: {
    flex: 0.85,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },

  footerContainer: {
    flex: 0.08,
  },

  globeHead: {
    fontSize: wp('5%'),
    textAlign: 'left',
    fontFamily: 'Gotham-Medium',
    justifyContent: "center",
    color: '#1A237E',
    marginTop: hp('2.5%'),
    marginLeft: hp('2.8%'),
  },
  editIcon: {
    marginTop: hp('2.5%'),
    marginRight: wp('-3%'),
  },

  textD: {
    fontFamily: 'Gotham-Medium',
    fontSize: wp('4%'),
    textAlign: 'left',
    color: '#7986CB',
    marginLeft: wp('3%'),
    marginTop: hp('-10%')
  },

  textD1: {
    fontFamily: 'Gotham-Medium',
    fontSize: wp('4%'),
    textAlign: 'right',
    color: '#7986CB',
    marginLeft: wp('55%'),
    marginTop: hp('-10%')
  },

  textD3: {
    fontFamily: 'Gotham-Medium',
    fontSize: wp('4%'),
    textAlign: 'left',
    color: '#1A237E',
    marginLeft: wp('6%'),
    marginTop: hp('-6%')
  },

  textD4: {
    fontFamily: 'Gotham-Medium',
    fontSize: wp('4%'),
    textAlign: 'right',
    color: '#1A237E',
    marginLeft: wp('70%'),
    marginTop: hp('-6%')
  },

  name: {
    fontFamily: 'Gotham-Bold',
    fontSize: wp('5.5%'),
    textAlign: 'center',
    color: '#1A237E',
    marginTop: hp('2.2%')
  },

  dev: {
    fontFamily: 'Gotham-Medium',
    fontSize: wp('5%'),
    textAlign: 'center',
    color: '#1A237E',
    marginTop: hp('2%'),
  },

  follow: {
    fontFamily: 'Gotham-Medium',
    fontSize: wp('3%'),
    textAlign: 'center',
    color: '#fff',
  },

  closeButton: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('30%'),
    height: hp('5%'),
    backgroundColor: 'blue',
    borderRadius: wp('2%'),
    marginTop: hp('4%')
  },

  closeText: {
    fontFamily: 'Gotham-Bold',
    fontSize: wp('3.5%'),
    textAlign: 'center',
    color: '#fff',
  },

});

