  import React from 'react';
  import { StyleSheet, FlatList,Text, View ,Dimensions ,TouchableOpacity,ActivityIndicator,TextInput, ScrollView ,AsyncStorage, StatusBar, Image } from 'react-native';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import { withNavigation, NavigationActions } from 'react-navigation';
  import { Col, Row, Grid } from "react-native-easy-grid";
  import SvgUri from 'react-native-svg-uri';  
  import Icon from 'react-native-vector-icons/AntDesign';
  import { FontAwesome } from '@expo/vector-icons';
  // import ImageSlider from 'react-native-image-slider';
  import { Font } from 'expo';  
  import Carousel from 'react-native-carousel-view';

  class OnBoardScreen extends React.Component {
    
    constructor(props){
      super(props)
      this.state = {
        fontLoaded: false 
      }
    }
    async componentDidMount() {
      await Expo.Font.loadAsync({
        'Gotham-Book': require('../assets/fonts/GothamRoundedBook_21018.ttf'),
        'Gotham-Bold': require('../assets/fonts/GothamBold.ttf'),
        'Gotham-Medium': require('../assets/fonts/GothamMedium.ttf'),
        'FontAwesome': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf'),
        'Ionicons': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
        'anticon': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/AntDesign.ttf'),
        'material': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
        'material-community': require('../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')
      });

      let userData = await AsyncStorage.getItem("userData");
      let data = JSON.parse(userData);
      if(data != undefined) {
        this.props.navigation.navigate('HomePage')
        this.setState({ fontLoaded: true });
      } else {
        this.setState({ fontLoaded: true });
      }
    }

  

    render() {
      
      if(this.state.fontLoaded) {
        return (
                <View style = {styles.container}>
                    
                    <StatusBar barStyle = 'light-content' />

                    <View style={{width:wp('100%'),height:hp('80%'),backgroundColor:'#F2F2F2'}}>
                      <Image style={{width:wp('100%'),height:hp('100%'),resizeMode:'contain'}} source={require('../assets/Tree.jpg')} />
                    </View>
                    <View style={{position:'absolute',width:wp('100%'),bottom:0,height:hp('40%'),backgroundColor:'#fff'}}>
                    <Grid>
                            <Row size = {60} style = {{backgroundColor : '#F2F2F2'}} >
                            <View style={{alignItems:'center', justifyContent:'center'}}>
                                <Text style={styles.contentContainerText}> Welcome To my React Native demo App</Text>
                                <Text style={styles.contentContainerText1}>Novel COVID - 19 </Text>
                            </View>
                            </Row>
                            <Row size = {40} style = {{backgroundColor : '#F2F2F2'}}> 
                              <Col size = {50} style = {styles.columnsAll}>
                                <TouchableOpacity style = {styles.dashboardButton} onPress={() => this.props.navigation.navigate('HomePage')}>
                                  <Text style = {styles.dashboardButtonText}>Home Page</Text>
                                </TouchableOpacity>
                              </Col>
                              
                            </Row>
                            
                          </Grid>
                    </View>
                    

                </View>
        );
      }
      else {
        return (
          <View style={{opacity:1,backgroundColor:'#0047CC',width:wp('100%'),height:hp('100%'),alignItems:'center',justifyContent:'center'      }}>
            <Image source={require('../assets/loader.gif')} style={{ width:50,height:50}} />
        </View>
          )
      
        } 
          
      }
  }
  export default withNavigation(OnBoardScreen)

  const styles = StyleSheet.create({
    container : {
      flex : 1,
      backgroundColor : '#F2F2F2',  
    },

    columnsAll : {
      alignItems : 'center',
      justifyContent : 'center'
    },

  // Dashboard Button

    dashboardButton : {
      width : wp('90%'),
      height : hp('7.5%'),
      backgroundColor : '#DFE7F5',
      borderRadius : 10,
      alignItems : 'center',
      justifyContent: 'center'
    
  },

  dashboardButtonText : {
    fontSize : wp('4.5%'),
    color : '#0047CC',
    textAlign : 'center',
    fontFamily : 'Gotham-Bold',
  }, 


  contentContainer : {
    alignItems : 'center',
    // justifyContent : 'center',
    // alignContent: 'center'
  },


  contentContainerText : {
    textAlign : 'center',
    color : '#042C5C',
     fontFamily : 'Gotham-Bold',
    fontSize : wp('5%'),
    marginTop : hp('2%'),
  },

  contentContainerText1 : {
    textAlign : 'center',
    color : '#77869E',
     fontFamily : 'Gotham-Book',
    fontSize : wp('4%'),
    marginTop : hp('2%'),
  },

  contentContainerText2 : {
    textAlign : 'center',
    color : '#77869E',
     fontFamily : 'Gotham-Book',
    fontSize : wp('4%'),
    marginTop : hp('1%'),
    marginLeft : hp('3.5%'),
    alignContent: 'center',

  },



  });